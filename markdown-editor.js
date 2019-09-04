import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://unpkg.com/stackedit-js@1.0.7/docs/lib/stackedit.js'

/**
 * `markdown-editor`
 * Connect to Bluetooth Device, Service, and Characteristics and Send and Receive Data.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MarkdownEditor extends PolymerElement {
    static get template() {
        return html`
        <style>
            .noSelect {
                user-select: none;
            }
            .main {
                border: 1px solid black;
                cursor: pointer;
                position: relative;
            }
            #preview {
                padding: 10px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
            }
        </style>
        <div class="main noSelect" on-click="openStackeditEvent" style="width: [[width]]px; height: [[height]]px;">
            <div id="preview" title="Double Click to Edit"></div>
            <textarea id="editor" style="display: none;"></textarea>
        </div>
        `;
    }
    static get properties() {
      return {
        markdown: {
            type: String
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        }
      }
    }

    constructor() {
      super();
      this.markdown = "";
      this.width = 330;
      this.height = 220;
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.el = context.shadowRoot.querySelector('#editor');
        context.preview = context.shadowRoot.querySelector('#preview');
        context.main = context.shadowRoot.querySelector('.main');
        context.stackedit = new Stackedit();

        // Open the iframe
        // openStackedit();

        // Listen to StackEdit events and apply the changes to the textarea.
        context.stackedit.on('fileChange', (file) => {
            context.markdown = context.el.value = file.content.text;
            context.preview.innerHTML = file.content.html;
            context.dispatchEvent(new CustomEvent("markdown", { 
                detail: file.content.text
            }));
            context.dispatchEvent(new CustomEvent("markup", { 
                detail: file.content.html
            }));
        });
    }

    openStackedit() {
        var context = this;
        context.stackedit.openFile({
            content: {
                text: context.markdown // and the Markdown content.
            }
        });
        setTimeout(function() {
            var stackedit = document.querySelector(".stackedit-container");
            var width = context.main.offsetWidth;
            var height = context.main.offsetHeight;
            stackedit.style.width = width + "px";
            stackedit.style.height = height + "px";
            stackedit.style.top = "100px";
            stackedit.style.left = "100px";
        }, 50);
    }

    openStackeditEvent(e) {
        e.stopPropagation();
        var context = this;
        if (context.editDblClickTimer) {
            clearInterval(context.editDblClickTimer);
            context.editDblClickTimer = null;
            context.openStackedit();
        }
        else {
            context.editDblClickTimer = setTimeout(function() {
                context.editDblClickTimer = null;
            }, 400);
        }
    }

}

window.customElements.define('markdown-editor', MarkdownEditor);
export { MarkdownEditor }