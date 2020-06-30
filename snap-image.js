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
        },
        uploadserver: {
            type: String
        }
      }
    }

    constructor() {
      super();
      this.width = 320;
      this.height = 240;
      this.snap = false;
      this.reset = true;
      this.uploadserver = "";
      this.stop = false;
      this.remixRawImage = false;
    }

    ready() {
        var context = this;
        super.ready();
        context.startCamera();
    }

    startCamera() {
        var context = this;
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
        context.stopCamera(context.stop);
    }

    stopCamera(fromStopProp) {
        var context = this;
        if (context && (context.stop || !fromStopProp) && context.video && context.video.srcObject) {
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
            context.snapImage();
        }
    }

    snapImage(fromSnapProp) {
        var context = this;
        if (context.snap || !fromSnapProp) {
            context.context.drawImage(context.video, 0, 0, context.width, context.height);
            context.reset = false;
            var dataUri = (context.remixRawImage ? "image-" : "") + context.canvas.toDataURL();
            if (context.uploadserver) {
                context.uploadToRemix(dataUri);
            } else {
                context.dispatchEvent(new CustomEvent("imageSnapped", { 
                    detail: { "dataUri": dataUri, "width": context.width, "height": context.height }
                }));
            }
        }        
    }

    uploadToRemix(dataURI) {
        var context = this;
        var base64 = dataURI.split(',')[1];
        var _rmx_content_type = "image/png";
        var uploadPayload = { "data": "{bin}" + base64, "_rmx_content_type": _rmx_content_type };
        if (context.uploadserver) {
            fetch(context.uploadserver, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(uploadPayload)
            })
            .then(response => response.text())
            .then(uploaded => {
                console.log(uploaded);
                var lastServerUrlSegment = context.uploadserver.lastIndexOf("/");
                var uploadedURL = context.uploadserver.substring(0, lastServerUrlSegment + 1);
                var ref = uploaded.replace("{ref}", "");
                uploadedURL += "raw/" + ref;
                context.dispatchEvent(new CustomEvent("uploadedURL", { 
                    detail: uploadedURL
                }));
            })
            .catch(error => {
                console.error(error);
            })
        }
    }

    _reset(reset, oldValue) {
        var context = this;
        if (!(reset && oldValue) && reset) {
            context.resetCamera(context.reset);
        }
    }

    resetCamera(fromResetProp) {
        var context = this;
        if (context.reset || !fromResetProp) {
            context.snap = false;
            context.reset = true;
            context.dispatchEvent(new CustomEvent("captureMode", { 
                detail: { "captureMode": context.reset }
            }));
        }
    }
}

window.customElements.define('snap-image', SnapImage);
export { SnapImage }