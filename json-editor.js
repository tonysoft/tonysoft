import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import "https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.js"

/**
 * `json-editor`
 * Connect to Bluetooth Device, Service, and Characteristics and Send and Receive Data.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class JsonEditor extends PolymerElement {
    static get template() {
        return html`
        <link href="https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.css" rel="stylesheet" type="text/css">
        <style>
            .noSelect {
                user-select: none;
            }
            .main {
                border: 1px solid black;
                cursor: pointer;
                overflow-y: auto;
                position: relative; 
            }
            .jsonEditor {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;              
            }
        </style>
        <div class="main noSelect jsonEditor" style="width: [[setWidth(width)]]; max-width: [[setMaxWidth(maxWidth)]]; height: [[setHeight(height)]]; ">
        </div>
        `;
    }
    static get properties() {
      return {
        json: {
            type: Object,
            observer: "_json"
        },
        mode: {
            type: String
        },
        maxWidth: {
            type: Number
        },
        height: {
            type: Number
        },
        width: {
            type: Number
        },
        onReadyProps: {
            type: Object
        }
      }
    }

    constructor() {
      super();
      this.markdown = null;
      this.maxWidth = 0;
      this.height = 0;
      this.width = 0;
      this.mode = "tree";
      this.json = null;
      this.onReadyProps = {};
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        if (!context.width || !context.height) {
            var elements = document.querySelectorAll("json-editor");
            elements.forEach(function(element) {
                var parentNode = element.parentNode;
                if (!element.style.width) {
                    element.style.width = "100%";
                }
                if (!element.style.height) {
                    element.style.height = "100%";
                }
            })
        }
        context.jsonEditor = context.shadowRoot.querySelector('.jsonEditor');
        var options = { 
            mode: context.mode,
            onEvent: function(node, event) {
                if (event.type === 'click') {
                    context.dispatchEvent(new CustomEvent("node", { 
                        detail: node
                    }));
                }
            }
        };
        context.editor = new JSONEditor(context.jsonEditor, options)
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
        }
    }

    setMaxWidth(maxWidth) {
        var context = this;
        if (!maxWidth) {
            return "10000px";
        }
        else {
            return maxWidth + "px";
        }
    }

    setWidth(width) {
        var context = this;
        if (!width) {
            return "100%";
        }
        else {
            return width + "px";
        }
    }

    setHeight(height) {
        var context = this;
        if (!height) {
            return "100%";
        }
        else {
            return height + "px";
        }
    }

    _json(json) {
        var context = this;
        if (context.checkIsReady("json", json, null)) {
            context.setJSON(json);
        }
    }

    checkIsReady(name, value, noValue) {
        var context = this;
        if (value === noValue) {
            return false;
        }
        if (!context.isReady) {
            context.onReadyProps[name] = value;
            context[name] = noValue;
            return false;
        }
        return true;
    }

    setJSON(json) {
        var context = this;
        if (!context.editor) {
            return;
        }
        context.editor.set(json);
        context.dispatchEvent(new CustomEvent("json", { 
            detail: context.editor.get()
        }));
    }

}

window.customElements.define('json-editor', JsonEditor);
export { JsonEditor }