import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
try {
    import 'https://unpkg.com/tonysoft@1.52.51/js/showdown.js'
} catch(e) {};

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
        }
      }
    }

    constructor() {
      super();
      this.markdown = "";
      this.maxWidth = 330;
      this.height = 220;
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.markup = context.shadowRoot.querySelector('.markup');
        context.converter = new showdown.Converter();
    }

    _markdown(markdown) {
        var context = this;
        if (!context.isReady) {
            var waitTilReady = setInterval(function() {
                if (context.isReady) {
                    clearInterval(waitTilReady);
                    context.convertMarkdown(markdown);
                }
            })
        } else {
            context.convertMarkdown(markdown);
        }
    }

    convertMarkdown(markdown) {
        var context = this;
        var markup = context.converter.makeHtml(context.markdown);  
        context.markup.innerHTML = markup;
    }

}

window.customElements.define('markdown-markup', MarkdownMarkup);
export { MarkdownMarkup }