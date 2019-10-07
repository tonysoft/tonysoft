import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


/**
 * `snap-image`
 * Snap an Image from the Camera and return a dataURI.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SnapImage extends PolymerElement {
    static get template() {
        return html`
        <style>
            .noSelect {
                user-select: none;
            }
            .main {
                position: relative;
            }
            .mediaElement {
                position: absolute;
                top: 0px;
                left: 0px;
                border: 1px solid black;
            }
            .isVisible: {
                display: block !important;
            }
            .isInvisible: {
                display: none !important;
            }
        </style>
        <div class="main noSelect" style="width: [[width]]px; height: [[height]]px;">
            <canvas id="canvas" class="mediaElement" width="[[width]]" height="[[height]]"></canvas>
            <video id="video" class="mediaElement" style="display:[[captureMode(reset)]]; width="[[width]]" height="[[height]]" autoplay></video>
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
        snap: {
            type: Boolean,
            observer: "_snap"
        },
        reset: {
            type: Boolean,
            observer: "_reset"
        },
        stop: {
            type: Boolean,
            observer: "_stop"
        },
        remixRawImage: {
            type: Boolean
        }
      }
    }

    constructor() {
      super();
      this.width = 320;
      this.height = 240;
      this.snap = false;
      this.reset = true;
      this.stop = false;
      this.remixRawImage = false;
    }

    ready() {
        var context = this;
        super.ready();
        context.video = context.shadowRoot.querySelector("#video");
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                context.video.srcObject = stream;
                context.video.play();
            });
        }
        context.canvas = context.shadowRoot.querySelector("#canvas");
        context.context = context.canvas.getContext('2d');
    }

    detached() {
        var context = this;
        super.detached();
        context._stop();
    }

    _stop() {
        var context = this;
        if (context && context.stop && context.video && context.video.srcObject) {
            var tracks = context.video.srcObject.getTracks();
            if (tracks.length) {
                tracks[0].stop();
            }
        }
    }

    captureMode(reset) {
        var context = this;
        if (reset) {
            return "block";
        } else {
            return "none";
        }
    }

    _snap(snap) {
        var context = this;
        if (snap && context && context.context) {
            context.context.drawImage(context.video, 0, 0, context.width, context.height);
            context.reset = false;
            var dataUri = (context.remixRawImage ? "image-" : "") + context.canvas.toDataURL();
            context.dispatchEvent(new CustomEvent("imageSnapped", { 
                detail: { "dataUri": dataUri, "width": context.width, "height": context.height }
            }));
        }
    }

    _reset(reset) {
        var context = this;
        if (reset) {
            context.snap = false;
        }
        context.dispatchEvent(new CustomEvent("captureMode", { 
            detail: { "captureMode": context.reset }
        }));
    }
}

window.customElements.define('snap-image', SnapImage);
export { SnapImage }