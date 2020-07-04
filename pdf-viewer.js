import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://unpkg.com/tonysoft@1.53.17/pdfMozilla/pdfMozilla.js';


/**
 * `pdf-viewer`
 * Connect to Bluetooth Device, Service, and Characteristics and Send and Receive Data.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PdfViewer extends PolymerElement {
    static get template() {
        return html`
        <style>
            .noSelect {
                user-select: none;
            }
            .main {
                position: relative;
            }
            .border {
                border: 1px solid #888888 !important;
                border-radius: 5px;
            }
            #preview {
                padding: 10px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;
            }

        </style>
        <div id="editor" on-click="focusOnEditor" class="main noSelect" style="width: [[setWidth(width)]]; max-width: [[setMaxWidth(maxWidth)]]; height: [[setHeight(height)]]; overflow: visible; position: relative;">
            <div class="prevPage" style="z-index: 0; display: [[conditionalPrevPageNavigation]]; cursor: n-resize; position: absolute; top: -16px; left: 0px; width: 100%; height: 20px; text-align: center;">
                <svg height="20" width="20">
                    <polygon points="10,0 20,20 0, 20" style="fill:#f0f0f0;stroke:#444444;stroke-width:1" />
                </svg>
            </div>
            <a href="[[src]]" title="View Document in a New Tab" style="z-index: 1; position: relative; pointer-events: [[hasBrowserLink(browserLink)]];" target="_blank">
                <canvas id="the-canvas" class="border" style="display: none; margin: [[margin]]px; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; " ></canvas>
            </a>
            <div class="nextPage" style="z-index: 0; display: [[conditionalNextPageNavigation]]; cursor: s-resize; position: absolute; bottom: -18px; left: 0px; width: 100%; height: 20px; text-align: center;">
                <svg height="20" width="20">
                    <polygon points="10,20 0,0 20,0" style="fill:#f0f0f0;stroke:#444444;stroke-width:1" />
                </svg>
            </div>
        </div>
      `;
    }
    static get properties() {
      return {
        src: {
            type: String,
            observer: "_src"
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
        margin: {
            type: Number
        },
        page: {
            type: Number,
            observer: "_page"
        },
        browserLink: {
            type: Boolean
        },
        pageNavigation: {
            type: Boolean,
            observer: "_pageNavigation"
        }
      }
    }

    constructor() {
      super();
      this.src = "";
      this.maxWidth = 0;
      this.height = 0;
      this.width = 0;
      this.getMarkdown = false;
      this.border = false;
      this.margin = 0;
      this.page = 0;
      this.src = null;
      this.browserLink = false;
      this.pageNavigation = false;
      this.conditionalPrevPageNavigation = "none"; 
      this.conditionalNextPageNavigation = "none"; 
      this.onReadyProps = {};
      this.componentId = "";
      this.nodeActionPackets = {};
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.pdfjsLib = window.pdfjsLib;
        context.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.1.266/build/pdf.worker.js';
        context.canvas = context.shadowRoot.querySelector('#the-canvas');
        context.prevPage = context.shadowRoot.querySelector('.prevPage');
        context.nextPage = context.shadowRoot.querySelector('.nextPage');
        context.canvas.addEventListener("click", function(e) {
            context.dispatchEvent(new CustomEvent("click", { 
                detail: context.pageNumber
            }));
        });
        context.prevPage.addEventListener("click", function(e) {
            if (context.pageNumber > 1) {
                context.page = context.pageNumber = context.pageNumber - 1;
            }
        });
        context.nextPage.addEventListener("click", function(e) {
            if (context.pageNumber < context.numPages) {
                context.page = context.pageNumber = context.pageNumber + 1;
            }
        });
        context.container = context.shadowRoot.querySelector('.main'); 
        if (!context.width || !context.height) {
            var elements = document.querySelectorAll("pdf-viewer");
            elements.forEach(function(element) {
                var parentNode = element.parentNode;
                if (!element.style.width) {
                    element.style.width = "100%";
                } else {
                    context.baseWidth = element.style.width.replace("px", "");
                    context.baseWidth = context.baseWidth.replace("%", "");
                }
                if (!element.style.height) {
                    element.style.height = "100%";
                } else {
                    context.baseHeight = element.style.height.replace("px", "");
                    context.baseHeight = context.baseHeight.replace("%", "");
                }
            })
        }
        context.baseHeight = context.baseHeight || context.container.offsetHeight;
        context.baseWidth = context.baseWidth || context.container.offsetWidth;
        if (!context.baseWidth) {
            context.baseWidth = parseInt(window.innerWidth * .4);
        }
        if (!context.baseHeight) {
            context.baseHeight = window.innerHeight * context.baseWidth / window.innerWidth;
        }
        var borderAdj = context.border ? 2 : 0;
        context.baseHeight -= (borderAdj + (context.margin * 2));
        context.baseWidth -= (borderAdj + (context.margin * 2));
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
        }
    }

    _pageNavigation(newValue, oldValue) {
        var context = this;
        if (newValue || (newValue === "")) {
          context.pageNavigation = true;
        } else {
            context.pageNavigation = false;
        }
    }

    _nodeActionPackets(actionPackets) {
        var context = this;
        if (context.nodeActionPackets.length > 0) {
            var packetIndex = 0;
            function processActionPacket(actionPacket, processNextActionPacket) {
                if (actionPacket.target === context.componentId) {
                    var commands = actionPacket.action;
                    if (commands && (commands.length > 0)) {
                        if (context.src !== commands[0]) {
                            context.src = commands[0];
                        }
                        if (commands.length > 0) {
                            var page = parseInt(commands[1]);
                            if (!isNaN(page)) {
                                setTimeout(function() {
                                    context.page = page;
                                })
                            }
                        }
                    }
                    processNextActionPacket();
                } else {
                    processNextActionPacket();
                }
            }
            function nextActionPacket() {
                packetIndex++;
                if (packetIndex < context.nodeActionPackets.length) {
                    processActionPacket(context.nodeActionPackets[packetIndex], nextActionPacket);
                }
            }
            processActionPacket(context.nodeActionPackets[packetIndex], nextActionPacket)
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

    hasBrowserLink(browserLink)  {
        var context = this;
        if (browserLink) {
            return "all";
        } else {
            return "none";
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

    initView(src) {
        var context = this;
        if (context.loadingTask) {
            context.loadingTask.destroy();
            context.numPages = 0;
        }
        if (!src) {
            context.canvas.style.display = "none";
            return;
        }
        context.canvas.style.display = "block";
        context.loadDocument(src);
    }

    getPageFromUrl(src) {
        var page = src.match(/page=([^&]+)/g);
        if (page && (page.length === 1)) {
            page = page[0].split("=");
        }
        if (page && page.length > 1) {
            page = decodeURIComponent(page[1]);
        } else {
            page = 0;
        }
        page = parseInt(page);
        if (!page) {
            page = 0;
        }
        return page;
    }

    loadDocument(src) {
        var context = this;
        if (context.loadingTask) {
            context.loadingTask.destroy();
            context.numPages = 0;
        }
        var pageFromUrl = context.getPageFromUrl(src);
        context.page = pageFromUrl ? pageFromUrl : context.page;
        context.loadingTask = context.pdfjsLib.getDocument(src);
        context.loadingTask.promise.then(function(pdf) {
            console.log('PDF loaded');
            context.currentPdf = pdf;
            context.numPages = pdf.numPages;
            
            // Fetch the first page
            context.pageNumber = (context.page && (context.page <= context.numPages)) ? context.page : 1;
            context.dispatchEvent(new CustomEvent("documentLoaded", { 
                detail: { 
                    src: src,
                    numPages: context.numPages,
                    currentPage: context.pageNumber
                }
            }));
            context.loadPage(context.pageNumber);
        }, function (reason) {
            // PDF loading error
            context.loadingTask.destroy();
            context.numPages = 0;
            context.canvas.style.display = "none";
            context.dispatchEvent(new CustomEvent("documentLoaded", { 
                detail: { 
                    src: src,
                    numPages: 0,
                    currentPage: 0,
                    error: reason
                }
            }));
             console.error(reason);
        }); 
    }   

    loadPage(pageNumber) {
        var context = this;
        if (pageNumber > context.numPages) {
            context.dispatchEvent(new CustomEvent("pageLoaded", { 
                detail: { 
                    numPages: context.numPages,
                    currentPage: pageNumber,
                    error: "Requested Page is out of range."
                }
            }));
            return;
        }
        context.currentPdf.getPage(pageNumber).then(function(page) {
            console.log('Page loaded');
            context.page = context.pageNumber = pageNumber;
            context.conditionalPrevPageNavigation = (context.pageNavigation && (context.numPages > 1) && (context.pageNumber > 1)) ? "block" : "none";
            context.conditionalNextPageNavigation = (context.pageNavigation && (context.numPages > 1) && (context.pageNumber < context.numPages)) ? "block" : "none";
            var scale = 1.5;
            var viewport = page.getViewport({scale: scale});

            var canvas = context.canvas;
            // Prepare canvas using PDF page dimensions
            var canvasContext = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            if (canvas.width > canvas.height) {
                var contWidth = context.baseWidth; // - context.margin;
                var contHeight = parseInt(context.baseWidth * canvas.height / canvas.width);// - context.margin;
                if (contHeight > context.baseHeight) {
                    contHeight = context.baseHeight; // - 2;
                    contWidth = parseInt(contHeight * canvas.width / canvas.height); // - context.margin;
                    canvas.style.top = "0px";
                    canvas.style.left = Math.max(((context.baseWidth - contWidth) / 2)) + "px";
                } else {
                    canvas.style.left = "0px";
                    canvas.style.top = Math.max(((context.baseHeight - contHeight) / 2), 0) + "px";
                }
                canvas.style.width = contWidth + "px";
                canvas.style.height = contHeight + "px";
            } else {
                var contWidth = parseInt(context.baseHeight * canvas.width / canvas.height); // - context.margin;
                var contHeight = context.baseHeight; // - context.margin;
                if (contWidth > context.baseWidth) {
                    contWidth = context.baseWidth; // - 2;
                    contHeight = parseInt(contWidth * canvas.height / canvas.width); // - context.margin;
                    canvas.style.left = "0px";
                    canvas.style.top = Math.max(((context.baseHeight - contHeight) / 2), 0) + "px";
                } else {
                    canvas.style.top = "0px";
                    canvas.style.left = Math.max(((context.baseWidth - contWidth) / 2), 0) + "px";
                }
                canvas.style.width = contWidth + "px";
                canvas.style.height = contHeight + "px";
            }

            // Render PDF page into canvas context
            var renderContext = {
            canvasContext: canvasContext,
            viewport: viewport
            };
            if (context.renderTask) {
                try {
                    context.renderTask.destroy();
                } catch(e) {};
            }
            context.renderTask = page.render(renderContext);
            context.renderTask.promise.then(function () {
                console.log('Page rendered');
                context.dispatchEvent(new CustomEvent("pageLoaded", { 
                    detail: { 
                        numPages: context.numPages,
                        currentPage: pageNumber,
                        width: 1,
                        height: canvas.height / canvas.width
                    }
                }));
            });
        });
    }

    _src(src) {
        var context = this;
        if (context.checkIsReady("src", src, null)) {
            context.initView(src);
        }
    }

    _page(page) {
        var context = this;
        if (!page) {
            return;
        }
        if (context.checkIsReady("page", page, null)) {
            if (context.numPages) {
                context.pageNumber = page;
                context.loadPage(page);
            }
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

window.customElements.define('pdf-viewer', PdfViewer);
export { PdfViewer }