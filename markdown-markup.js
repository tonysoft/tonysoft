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
                border: 1px solid black;
                cursor: pointer;
                overflow-y: auto;
            }
            .markup {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;
                padding: 10px;
                
            }
        </style>
        <div class="main noSelect" style="max-width: [[maxWidth]]px; height: [[height]]px;">
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