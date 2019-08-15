import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


/**
 * `video-component`
 * Wrapper Component around html5 video tag.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class VideoComponent extends PolymerElement {
    static get template() {
        return html`
          <style>
            .noSelect {
                user-select: none;
            }
            .main {
                border-radius: 5px;
                border: 1px solid black;
                overflow: hidden;
            }
            .theVideo {
                width:100%;
                height:100%; 
                outline: none;
            }
          </style>
          <div style="position: relative; width: [[width]]px; height: [[height]]px;">
            <div class="main noSelect"style="position: absolute; top: [[top]]px; left: [[left]]px; width: [[width]]px; height: [[height]]px;">
                <video src="[[src]]" controls class="theVideo" on-canplay="loaded" onloadedmetadata="metadataLoaded"></video>
            </div>
          </div>
        `;
      }
  
    static get properties() {
      return {
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        left: {
            type: Number
        },
        top: {
            type: Number
        },
        src: {
            type: String
        },
        bestFit: {
            type: Boolean
        },
        centered: {
            type: Boolean
        }
      }
    }

    loaded(e) {
        var context = this;
        context.scaleIfNecessary();
    }

    metadataLoaded(e) {
        var context = this;

    }

    constructor() {
      super();
      this.width = 320;
      this.height = 180;
      this.left = 0;
      this.top = 0;
      this.src = "";
      this.bestFit = false;
      this.centered = false;
    }

    scaleIfNecessary() {
        var context = this;
        if (context.bestFit) {
            if (!context.originalWidth && context.parentNode) {
              context.originalWidth = context.width;
              context.originalHeight = context.height;
            }
            if (context.resizeInterval) {
                clearInterval(context.resizeInterval);
            }
            function doScale() {
                if (!context.parentNode) {
                  return;
                }
                var targetWidth = context.originalWidth;
                var targetHeight = context.originalHeight;
                var maxWidth = window.innerWidth;
                var maxHeight = window.innerHeight;
                var remixAppParent = document.querySelector("remix-sg-viewer#inspector-out_2");
                var topOffset = 0;
                if (!remixAppParent) {
                    remixAppParent = document.querySelector(".remix-app-parent");
                }
                if (remixAppParent) {
                    maxWidth = remixAppParent.offsetWidth;
                    maxHeight = remixAppParent.offsetHeight;
                    var parentGroup = context.parentNode;
                    topOffset = parentGroup.offsetTop;
                }
                maxHeight -= topOffset;
                var scale = 1.0;
                var adjWidth = 0;
                var adjHeight = 0;
                var horzScale = maxWidth / targetWidth;
                var vertScale = maxHeight / targetHeight;
                if (horzScale < vertScale) {
                    scale = horzScale;
                }
                else {
                    scale = vertScale;
                }
                adjWidth = parseInt((context.originalWidth * scale)) - 2;
                adjHeight = parseInt((context.originalHeight * scale)) - 2;
                if (context.centered) {
                    context.top = parseInt((maxHeight - adjHeight) / 2);
                    context.left = parseInt((maxWidth - adjWidth) / 2);
                }
                if (context.lastScale !== scale) {
                    context.width = adjWidth;
                    context.height = adjHeight;
                    context.lastScale = scale;
                }
            }
            doScale();
            context.resizeInterval = setInterval(function() {
                doScale();
            }, 1000);
        }
    }

}


window.customElements.define('video-component', VideoComponent);
export { VideoComponent }