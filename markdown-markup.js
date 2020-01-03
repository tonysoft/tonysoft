import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/9.1.0/markdown-it.js'
import 'https://unpkg.com/tonysoft@^1.52.88/js/turndown.js'

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
                position: relative; 
            }
            .border {
                border: 1px solid #888888;
                border-radius: 5px;
            }
            .markup {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
                font-weight: 300;
                padding: 10px;
                
            }
        </style>
        <div class$="main noSelect [[hasBorder(border)]]" style="display: [[isHidden(hidden)]]; width: [[setWidth(width)]]; max-width: [[setMaxWidth(maxWidth)]]; height: [[setHeight(height)]];">
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
        markup: {
            type: String,
            observer: "_markup"
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
        border: {
            type: Boolean
        },
        onReadyProps: {
            type: Object
        },
        hidden: {
            type: Boolean
        }
      }
    }

    constructor() {
      super();
      this.markdown = null;
      this.markup = null;
      this.maxWidth = 0;
      this.height = 0;
      this.width = 0;
      this.hidden = false;
      this.onReadyProps = {};
      this.border = false;
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.markupDest = context.shadowRoot.querySelector('.markup');
        if (!context.width || !context.height) {
            var elements = document.querySelectorAll("markdown-markup");
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
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
        }
    }

    isHidden(hidden) {
        var context = this;
        if (!hidden) {
            return "block";
        } else {
            return "none";
        }
    }

    hasBorder(border) {
        var context = this;
        if (border) {
            return "border";
        } else {
            return "";
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

    _markdown(markdown) {
        var context = this;
        if (context.checkIsReady("markdown", markdown, null)) {
            context.convertMarkdown(markdown);
        }
    }

    _markup(markup) {
        var context = this;
        if (context.checkIsReady("markup", markup, null)) {
            context.convertMarkup(markup);
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

    convertMarkup(markup) {
        var context = this;
        if (!context.reverseConverter) {
            context.reverseConverter = new TurndownService({ "headingStyle": "atx"});
        }
        context.markupDest.innerHTML = markup;
        var markdown = context.reverseConverter.turndown(markup);  
        context.dispatchEvent(new CustomEvent("convertedMarkdown", { 
            detail: markdown
        }));
    }

    convertMarkdown(markdown, emojiSize) {
        var context = this;
        if (!context.converter) {
            context.converter = new markdownit({ "html": true });
        }
        var emojiFound = true;

        var markup = context.converter.render(markdown);  
        markup = context.checkForEmojis(markup, emojiSize);
        if (context.markupDest) {
            context.markupDest.innerHTML = markup;
        }
        context.dispatchEvent(new CustomEvent("markup", { 
            detail: markup
        }));
        return markup;
    }

    checkForEmojis(markup, emojiSize) {
        emojiSize = emojiSize || 22;
        var emojiSizeInPixels = emojiSize + "px";
        var emojiOffsetInPixels = (emojiSize / 5) + "px";
        var startEmojiIndex = markup.search(/(?<=\:)(.*?)(?=\:)/);
        while (startEmojiIndex >= 0) {
            if (markup.charAt(startEmojiIndex) !== '/') {
                var emojiMarkuptemplate = '<img src="https~~//www.webfx.com/tools/emoji-cheat-sheet/graphics/emojis/${emoji}.png" style="width~~ NNpx; height~~ NNpx; position~~ relative; top~~ OOpx;"></img>';
                while (emojiMarkuptemplate.indexOf("NNpx") >= 0) {
                    emojiMarkuptemplate = emojiMarkuptemplate.replace("NNpx", emojiSizeInPixels);
                }
                while (emojiMarkuptemplate.indexOf("OOpx") >= 0) {
                    emojiMarkuptemplate = emojiMarkuptemplate.replace("OOpx", emojiOffsetInPixels);
                }
                var preMarkup = markup.substring(0, startEmojiIndex -1);
                var endEmojiIndex = markup.indexOf(":", startEmojiIndex);
                var postMarkup = markup.substr(endEmojiIndex + 1);
                var emoji = markup.substring(startEmojiIndex, endEmojiIndex);
                if ((emoji.length <= 40) && (emoji.indexOf(" ") && !((emoji.length > 15) && (emoji.indexOf("_") < 0)))) {
                    emoji = emojiMarkuptemplate.replace("${emoji}", emoji);
                    markup = preMarkup + emoji + postMarkup;
                } else {
                    markup = preMarkup + "~~" + emoji + ":" + postMarkup;
                }
            } else {
                markup = markup.replace(":/", "~~/");
            }
            startEmojiIndex = markup.search(/(?<=\:)(.*?)(?=\:)/);
        }
        while (markup.indexOf("~~") >= 0) {
            markup = markup.replace("~~", ":");
        }
        return markup;
    }

}

window.customElements.define('markdown-markup', MarkdownMarkup);
export { MarkdownMarkup }