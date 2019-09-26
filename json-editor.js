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
                overflow-y: auto;
                position: absolute; 
            }
            .buttonActive {
                opacity: 1.0;
                pointer-events: all;
                cursor: pointer;
            }
            .buttonInactive {
                opacity: 0.4;
                pointer-events: none;
                cursor: default;
            }
            .jsonEditor {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;              
            }
        </style>
        <div style="position: relative; width: [[setWidth(width)]]; max-width: [[setMaxWidth(maxWidth)]]; height: [[setHeight(height)]]; ">
            <div class="main noSelect jsonEditor" style="width: 100%; height: 100%;">
            </div>
            <button on-click="getJsonPayload" class="buttonActive" style="position: absolute; bottom: 3px; right:3px;">Get</button>
            <button on-click="setTreeMode" class$="[[editorMode(mode, 'tree')]]" style="position: absolute; bottom: 3px; right:63px;">Tree</button>
            <button on-click="setTextMode" class$="[[editorMode(mode, 'text')]]" style="position: absolute; bottom: 3px; right:123px;">Text</button>
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
            type: String,
            observer: "_mode"
        },
        height: {
            type: Number
        },
        width: {
            type: Number
        },
        getJson: {
            type: Boolean,
            observer: "_getJson"
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
      this.getJson = false;
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
        context.options = { 
            mode: context.mode,
            onEvent: function(node, event) {
                if (event.type === 'click') {
                    context.dispatchEvent(new CustomEvent("node", { 
                        detail: node
                    }));
                }
            }
        };
        context.editor = new JSONEditor(context.jsonEditor, context.options);
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

    editorMode(mode, whichMode) {
        if (mode === whichMode) {
            return "buttonInactive";
        } else {
            return "buttonActive";
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

    _mode(mode) {
        var context = this;
        if (context.checkIsReady("mode", mode, null)) {
            context.setMode(mode);
        }
    }

    _getJson(state) {
        var context = this;
        if (state && context.editor) {
            context.getJson = false;
            var json = context.editor.get();
            context.dispatchEvent(new CustomEvent("json", { 
                detail: json
            }));
        }
    }

    getJsonPayload() {
        var context = this;
        context._getJson(true);
    }

    setTreeMode() {
        var context = this;
        context.mode = "tree";
    }

    setTextMode() {
        var context = this;
        context.mode = "text";
    }

    setMode(mode) {
        var context = this;
        if (mode !== context.options.mode) {
            var json = context.editor.get();
            context.setJSON(json, mode);
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

    setJSON(json, newMode) {
        var context = this;
        if (!context.editor) {
            return;
        }
        if (newMode) {
            context.jsonEditor.innerHTML = "";
            context.options.mode = newMode;
            context.editor = new JSONEditor(context.jsonEditor, context.options);
        }
        context.editor.set(json);
        context._getJson(true);
    }

}

window.customElements.define('json-editor', JsonEditor);
export { JsonEditor }