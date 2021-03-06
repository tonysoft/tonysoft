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
        <link href="https://www.remixlabs.com/global/component.css" rel="stylesheet" type="text/css">
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
        componentId: {
            type: String
        },
        nodeActionPackets: {
            type: Array,
            observer: "_nodeActionPackets"
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
      this.componentId = "";
      this.nodeActionPackets = {};
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

    _nodeActionPackets(actionPackets) {
        var context = this;
        setTimeout(function() {
            if (context.nodeActionPackets.length > 0) {
                var packetIndex = 0;
                function processActionPacket(actionPacket, processNextActionPacket) {
                    var actionDef = actionPacket.action;
                    var commands = context.extractCommands(actionDef);
                    var katoms = context.extractKatoms(actionDef, actionPacket.target === context.componentId);
                    if (actionPacket.target === context.componentId) {
                        if (commands && (commands.length > 0)) {
                            var markdown = commands.join("\n");
                            setTimeout(function() {
                                context.markdown = markdown;
                            })
                        }
                        processNextActionPacket(katoms);
                    } else {
                        processNextActionPacket(katoms);
                    }
                }
                var accumulatedKatoms = [];
                function nextActionPacket(katoms) {
                    accumulatedKatoms = accumulatedKatoms.concat(katoms);
                    packetIndex++;
                    if (packetIndex < context.nodeActionPackets.length) {
                        processActionPacket(context.nodeActionPackets[packetIndex], nextActionPacket);
                    } else {
                        if (accumulatedKatoms.length > 0) {
                            setTimeout(function() {
                                context.dispatchEvent(new CustomEvent("nodeActionKeys", { 
                                    detail: accumulatedKatoms
                                }));
                            }, 500)
                        }
                    }
                }
                processActionPacket(context.nodeActionPackets[packetIndex], nextActionPacket)
            }
        })
    }

    extractCommands(actionDef) {
        var commands = [];
        actionDef.forEach(function(action) {
            action = action.trim();
            if (action.trim().indexOf(">>") < 0) {
                commands.push(action);
            }
        })
        return commands;
    }

    extractKatoms(actionDef, targeted) {
        var katoms = [];
        if (targeted) {
            actionDef.forEach(function(action) {
                action = action.trim();
                if (action.indexOf(">>") === 0) {
                    katoms.push(action.trim().split(">>")[1].trim());
                }
            })
        }
        return katoms;
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

    _markdown(markdown, emojiSize, emojiOffset) {
        var context = this;
        if (context.checkIsReady("markdown", markdown, null)) {
            context.convertMarkdown(markdown, emojiSize, emojiOffset);
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

    convertMarkdown(markdown, emojiSize, emojiOffset) {
        var context = this;
        if (!context.converter) {
            context.converter = new markdownit({ "html": true });
        }
        var emojiFound = true;

        var markup = context.converter.render(markdown);  
        markup = context.checkForEmojis(markup, emojiSize, emojiOffset);
        context.dispatchEvent(new CustomEvent("markup", { 
            detail: markup
        }));
        if (context.markupDest) {
            context.markupDest.innerHTML = markup;
            var text = context.markupDest.textContent;
            while (text.indexOf("\n\n\n") >= 0) {
                text = text.replace("\n\n\n", "\n\n");
            }
            setTimeout(function() {
                context.dispatchEvent(new CustomEvent("text", { 
                    detail: text
                }));
            }, 250);
        }
        return markup;
    }

    checkForEmojis(markup, emojiSize, emojiOffset) {
        emojiSize = emojiSize || 22;
        var emojiSizeInPixels = emojiSize + "px";
        emojiOffset = (emojiOffset === undefined) ? (emojiSize / 5) : emojiOffset;
        var emojiOffsetInPixels = emojiOffset + "px";
        var emojiRegex = new RegExp("\:(\w+)\:", "g"); //new RegExp('/(?<=\:)(.*?)(?=\:)/');
        var startEmojiIndex = markup.search(/\:(\w+)\:/) + 1;
        while (startEmojiIndex > 0) {
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
            startEmojiIndex = markup.search(/\:(\w+)\:/) + 1;
        }
        while (markup.indexOf("~~") >= 0) {
            markup = markup.replace("~~", ":");
        }
        return markup;
    }

}

window.customElements.define('markdown-markup', MarkdownMarkup);
export { MarkdownMarkup }