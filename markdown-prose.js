import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import "https://unpkg.com/tonysoft@^1.52.65/js/prosemirror.js?module";
import "https://unpkg.com/tonysoft@^1.52.63/js/proseMirrorHelpers.js?module";

/**
 * `markdown-prose`
 * Connect to Bluetooth Device, Service, and Characteristics and Send and Receive Data.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MarkdownProseEditor extends PolymerElement {
    static get template() {
        return html`
        <link href="https://unpkg.com/tonysoft@1.52.66/css/prosemirror.css" rel="stylesheet" type="text/css">
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
        <div id="editor" class="main noSelect" style="max-width: [[maxWidth]]px; height: [[height]]px;">
        </div>
        <div>

</div>
      `;
    }
    static get properties() {
      return {
        markdown: {
            type: String,
            observer: "_markdown"
        },
        maxWidth: {
            type: Number
        },
        height: {
            type: Number
        },
        getMarkdown: {
            type: Boolean,
            observer: "_getMarkdown"
        },
        onReadyProps: {
            type: Object
        }
      }
    }

    constructor() {
      super();
      this.markdown = "";
      this.maxWidth = 330;
      this.height = 220;
      this.getMarkdown = false;
      this.onReadyProps = {};
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.place = context.shadowRoot.querySelector('#editor');
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
        }
        // context.initView();
    }

    initView() {
        var context = this;
        if (context.view) {
            context.view.destroy();
        }
        context.view = new ProseMirrorView(context.place, context.markdown);
    }

    _markdown(markdown) {
        var context = this;
        if (context.checkIsReady("markdown", markdown, null)) {
            context.initView();
        }
    }

    _getMarkdown(state) {
        var context = this;
        if (state && context.view) {
            context.dispatchEvent(new CustomEvent("markdown", { 
                detail: context.view.content
            }));
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


}

window.customElements.define('markdown-prose', MarkdownProseEditor);
export { MarkdownProseEditor }