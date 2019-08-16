import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@google-web-components/google-youtube/google-youtube.js'


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
            <div class="main noSelect" style="position: absolute; top: [[top]]px; left: [[left]]px; width: [[width]]px; height: [[height]]px;">
                <span style="display: [[isHTML5(youTube)]];" >
                    <video src="" class="theVideo" on-canplay="loaded" on-loadedmetadata="metadataLoaded" on-play="playStatus" on-pause="playStatus" muted></video>
                </span>
                <span style="display: [[isYouTube(youTube)]];" >
                    <google-youtube class="theVideo youTube" video-id="..." rel="0" autoplay="1"></google-youtube>
                </span>
        
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
            type: String,
            observer: "_srcChanged"
        },
        bestFit: {
            type: Boolean
        },
        centered: {
            type: String
        },
        isReady: {
            type: Boolean
        },
        autoplay: {
            type: Boolean
        },
        muted: {
            type: Boolean
        },
        showControls: {
            type: Boolean
        },
        playVideo: {
            type: Boolean,
            observer: "_playVideo"
        },
        pauseVideo: {
            type: Boolean,
            observer: "_pauseVideo"
        },
        youTube: {
            type: Boolean
        }
      }
    }


    ready() {
        var context = this;
        super.ready();
        if (context.youTube) {
            context.video = context.shadowRoot.querySelector(".youTube");
        } else {
            context.video = context.shadowRoot.querySelector("video");
        }
        context.video.autoplay = context.autoplay;
        // if (context.youTube) {
        //     context.video.videoId = context.src;
        // } else {
        //     context.video.src = context.src;
        // }
        context.isReady = true;
        context.scaleIfNecessary();
    }

    _srcChanged(newValue) {
        var context = this;
        if (newValue) {
            if (!context.isReady) {
                var waitForReady = setInterval(function() {
                    if (context.isReady) {
                        clearInterval(waitForReady);
                        context.setSrc(newValue);
                    }
                }, 50);
            } else {
                context.setSrc(newValue);
            }
        }
    }

    setSrc(newValue) {
        var context = this;
        if (context.youTube) {
            context.video.videoId = context.src;
        } else {
            context.video.src = context.src;
        }
    }

    loaded(e) {
        var context = this;
        var video = context.video;
        if (!context.autoplay) {
            video.muted = context.muted;
        }
        context.isReady = true;
        context.showControlsBar(context.showControls);
        // context.scaleIfNecessary();
        setTimeout(function() {
            var state = video.paused ? "pause" : "play";
            context.playStatus({ type: state })
        }, 100)

    }

    metadataLoaded(e) {
        var context = this;

    }

    playStatus(e) {
        var context = this;
        context.dispatchEvent(new CustomEvent("playState", { 
            detail: { 
                playing: (e.type === "play"),
                paused: (e.type === "pause"),
                state: (e.type === "play") ? "playing" : "paused"
            }
        }));
    }

    _playVideo(newValue) {
        var context = this;
        var video = context.video;
        if (newValue) {
            context.pauseVideo = false;
            context.playTheVideo();
        }
    }

    _pauseVideo(newValue) {
        var context = this;
        var video = context.video;
        if (newValue) {
            context.playVideo = false;
            context.pauseTheVideo();
        }
    }

    playTheVideo() {
        var context = this;
        var video = context.video;
        video.play();
    }

    pauseTheVideo() {
        var context = this;
        var video = context.video;
        video.pause();
    }

    constructor() {
      super();
      this.width = 320;
      this.height = 180;
      this.left = 0;
      this.top = 0;
      this.src = "";
      this.bestFit = false;
      this.centered = "";
      this.autoplay = false;
      this.isReady = false;
      this.playVideo = false;
      this.pauseVideo = false;
      this.muted = false;
      this.showControls = true;
      this.youTube = false;
    }

    isHTML5(youTube) {
        var context = this;
        if (!youTube) {
            return "block";
        } else {
            return "none";
        }
    }

    isYouTube(youTube) {
        var context = this;
        if (youTube) {
            return "block";
        } else {
            return "none";
        }
    }

    showControlsBar(showControls) {
        var context = this;
        var video = context.video;
        if (showControls) {
            video.controls = true;
            return "true";
        } else {
            return "false";
        }
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
                else {
                    topOffset = context.offsetTop;
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
                    if (context.centered.toLowerCase().indexOf("ver") >= 0) {
                        context.top = parseInt((maxHeight - adjHeight) / 2);
                    }
                    if (context.centered.toLowerCase().indexOf("hor") >= 0) {
                        context.left = parseInt((maxWidth - adjWidth) / 2);
                    }
                }
                if (context.lastScale !== scale) {
                    context.width = adjWidth;
                    context.height = adjHeight;
                    var youTube = context.shadowRoot.querySelector(".youTube");
                    if (youTube && youTube.shadowRoot) {
                        var container = youTube.shadowRoot.querySelector("#container");
                        if (container) {
                            container.style.width = adjWidth + "px";
                            container.style.height = adjHeight + "px";
                        }
                    }
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