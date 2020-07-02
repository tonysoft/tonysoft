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
                overflow: hidden;
            }
            .mediaElement {
                position: absolute;
                top: 0px;
                left: 0px;
                border: 0px solid black;
            }
            .isVisible: {
                display: block !important;
            }
            .isInvisible: {
                display: none !important;
            }

            #scaleImg {
                position: absolute;
                pointer-events: none;
                opacity: 0;
                left: 0px;
            }
        </style>
        <div class="main noSelect" style="width: [[width]]px; height: [[height]]px;">
            <canvas id="canvas" class="mediaElement" width="[[width]]" height="[[height]]" style=""></canvas>
            <video id="video" class="mediaElement" style="display:[[captureMode(reset)]];" width="[[width]]" height="[[height]]" autoplay></video>
            <img id="scaleImg"></img> 
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
        maxwidth: {
            type: Number
        },
        maxheight: {
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
      this.maxwidth = 1440;
      this.maxheight = 810;
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
        context.scaleImg = context.shadowRoot.querySelector("#scaleImg");
        context.video = context.shadowRoot.querySelector("#video");
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                context.video.srcObject = stream;
                context.video.play();
            });
        }
        setTimeout(function() {
            console.log("video playing");
            context.width = context.video.offsetWidth;
            context.height = context.video.offsetHeight;
        }, 1000)
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
            if (context.maxwidth && context.maxheight) {
                context.scaleImg.src = dataUri;
                setTimeout(function() {
                    var width = context.scaleImg.naturalWidth;
                    var height = context.scaleImg.naturalHeight;
                    console.log(width + ":" + height);
                    dataUri = context.resizeCanvasImage(context.scaleImg, context.maxwidth, context.maxheight, dataUri);
                    context.scaleImg.src = dataUri;
                    finishUpload();
                })
            } else {
                finishUpload()
            }
            context.dispatchEvent(new CustomEvent("captureMode", { 
                detail: { "captureMode": context.reset }
            }));

            function finishUpload() {
                if (context.uploadserver) {
                    context.uploadToRemix(dataUri);
                } else {
                    context.dispatchEvent(new CustomEvent("imageSnapped", { 
                        detail: { "dataUri": dataUri, "width": context.width, "height": context.height }
                    }));
                }
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

    resizeCanvasImage(img, maxWidth, maxHeight, dataURL) {
        var imgWidth = img.width, 
            imgHeight = img.height;

        var ratio = 1, ratio1 = 1, ratio2 = 1;
        ratio1 = maxWidth / imgWidth;
        ratio2 = maxHeight / imgHeight;

        // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box.
        if (ratio1 < ratio2) {
            ratio = ratio1;
        }
        else {
            ratio = ratio2;
        }

        if (ratio < 1) {
            // var canvasContext = canvas.getContext("2d");
            var canvasCopy = document.createElement("canvas");
            var copyContext = canvasCopy.getContext("2d");
            var canvasCopy2 = document.createElement("canvas");
            var copyContext2 = canvasCopy2.getContext("2d");
            canvasCopy.width = imgWidth;
            canvasCopy.height = imgHeight;  
            copyContext.drawImage(img, 0, 0);

            // init
            canvasCopy2.width = imgWidth;
            canvasCopy2.height = imgHeight;        
            copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);


            var rounds = 2;
            var roundRatio = ratio * rounds;
            for (var i = 1; i <= rounds; i++) {
                console.log("Step: "+i);

                // tmp
                canvasCopy.width = imgWidth * roundRatio / i;
                canvasCopy.height = imgHeight * roundRatio / i;

                copyContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvasCopy.width, canvasCopy.height);

                // copy back
                canvasCopy2.width = imgWidth * roundRatio / i;
                canvasCopy2.height = imgHeight * roundRatio / i;
                copyContext2.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvasCopy2.width, canvasCopy2.height);

            } // end for


            // copy back to canvas
            // canvas.width = imgWidth * roundRatio / rounds;
            // canvas.height = imgHeight * roundRatio / rounds;
            //canvasContext.drawImage(canvasCopy2, 0, 0, canvasCopy2.width, canvasCopy2.height, 0, 0, canvas.width, canvas.height);
            return canvasCopy2.toDataURL(canvasCopy2);
        } else {
            return dataURL;
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