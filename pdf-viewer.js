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
                positionx: relative;
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
        <div id="editor" on-click="focusOnEditor" class="main noSelect" style="width: [[setWidth(width)]]; max-width: [[setMaxWidth(maxWidth)]]; height: [[setHeight(height)]]; overflow: hidden;">
            <canvas id="the-canvas" class="border" style="margin: [[margin]]px; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; " ></canvas
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
        margin: {
            type: Number
        },
        page: {
            type: Number,
            observer: "_page"
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
      this.onReadyProps = {};
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.pdfjsLib = window.pdfjsLib;
        context.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.1.266/build/pdf.worker.js';
        context.canvas = context.shadowRoot.querySelector('#the-canvas');
        context.container = context.shadowRoot.querySelector('.main'); 
        if (!context.width || !context.height) {
            var markdownMarkups = document.querySelectorAll("pdf-viewer");
            markdownMarkups.forEach(function(markdownMarkup) {
                markdownMarkup.style.width = "inherit";
                markdownMarkup.style.height = "inherit";
            })
        }
        context.baseHeight = context.container.offsetHeight;
        context.baseWidth = context.container.offsetWidth;
        var borderAdj = context.border ? 2 : 0;
        context.baseHeight -= (borderAdj + (context.margin * 2));
        context.baseWidth -= (borderAdj + (context.margin * 2));
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
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

    loadDocument(src) {
        var context = this;
        if (context.loadingTask) {
            context.loadingTask.destroy();
            context.numPages = 0;
        }
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
            
            var scale = 1.5;
            var viewport = page.getViewport({scale: scale});

            var canvas = context.canvas;
            // Prepare canvas using PDF page dimensions
            var canvasContext = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            if (canvas.width > canvas.height) {
                var contWidth = context.baseWidth;
                var contHeight = parseInt(context.baseWidth * canvas.height / canvas.width);
                canvas.style.width = contWidth + "px";
                canvas.style.height = contHeight + "px";
                canvas.style.left = "0px";
                canvas.style.top = Math.max(((context.baseHeight - contHeight) / 2)) + "px";
            } else {
                var contWidth = parseInt(context.baseHeight * canvas.width / canvas.height);
                var contHeight = context.baseHeight;
                canvas.style.width = contWidth + "px";
                canvas.style.height = contHeight + "px";
                canvas.style.top = "0px";
                canvas.style.left = Math.max(((context.baseWidth - contWidth) / 2), 0) + "px";
            }

            // Render PDF page into canvas context
            var renderContext = {
            canvasContext: canvasContext,
            viewport: viewport
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                console.log('Page rendered');
                context.dispatchEvent(new CustomEvent("pageLoaded", { 
                    detail: { 
                        numPages: context.numPages,
                        currentPage: pageNumber
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