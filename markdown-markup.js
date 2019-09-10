import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/9.1.0/markdown-it.js'

/**
 * `markdown-markup`
 * Connect to Bluetooth Device, Service, and Characteristics and Send and Receive Data.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MarkdownMarkup extends PolymerElement {
    static get template() {
        return html`
        <style>
            .noSelect {
                user-select: none;
            }
            .main {
                cursor: pointer;
                overflow: auto;
            }
            .border {
                border: 2px solid #888888;
                border-radius: 5px;
            }
            .markup {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;
                padding: 10px;
                
            }
        </style>
        <div class$="main noSelect [[hasBorder(border)]]" style="max-width: [[maxWidth]]px; height: [[height]]px;">
            <div class="markup"></div>
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
        border: {
            type: Boolean
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
      this.onReadyProps = {};
      this.border = false;
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.markup = context.shadowRoot.querySelector('.markup');
        context.converter = new markdownit({ "html": true });
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
        }
    }

    hasBorder(border) {
        if (border) {
            return "border";
        } else {
            return "";
        }
    }

    _markdown(markdown) {
        var context = this;
        if (context.checkIsReady("markdown", markdown, null)) {
            context.convertMarkdown(markdown);
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

    convertMarkdown(markdown) {
        var context = this;
        if (!context.converter) {
            return;
        }
        var markup = context.converter.render(context.markdown);  
        context.markup.innerHTML = markup;
        context.dispatchEvent(new CustomEvent("markup", { 
            detail: markup
        }));
    }

}

window.customElements.define('markdown-markup', MarkdownMarkup);
export { MarkdownMarkup }