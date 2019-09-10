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
            }
            .jsonEditor {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;              
            }
        </style>
        <div class="main noSelect jsonEditor" style="max-width: [[maxWidth]]px; height: [[height]]px;">
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
        onReadyProps: {
            type: Object
        }
      }
    }

    constructor() {
      super();
      this.markdown = null;
      this.maxWidth = 330;
      this.height = 220;
      this.mode = "tree";
      this.json = null;
      this.onReadyProps = {};
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.jsonEditor = context.shadowRoot.querySelector('.jsonEditor');
        var options = { mode: context.mode };
        context.editor = new JSONEditor(context.jsonEditor, options)
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
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