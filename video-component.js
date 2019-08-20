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
                    <google-youtube class="theVideo youTube" video-id="..." rel="0" on-state-changed="playStatus" on-google-youtube-ready="youTubeReady"></google-youtube>
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
        playPosition: {
            type: Number,
            observer: "_playPosition"
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
        bottomSpacing: {
            type: Number
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
        context.setVideoType();
        context.isReady = true;
        context.scaleIfNecessary();
    }

    setVideoType() {
        var context = this;
        if (context.youTube) {
            context.video = context.shadowRoot.querySelector(".youTube");
        } else {
            context.video = context.shadowRoot.querySelector("video");
        }
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
        var probablyYouTube = (newValue.indexOf("/") < 0);
        if (probablyYouTube) {
            context.youTube = true;
            context.setVideoType();
        } else {
            context.youTube = false;
        }

        if (context.youTube) {
            if (context.autoplay) {
                context.video.mute();
            }
            context.video.autoplay = context.autoplay ? 1 : 0;
            context.video.videoId = context.src;
        } else {
            context.video.autoplay = context.autoplay;
            context.video.src = context.src;
        }
    }

    youTubeReady(e) {
        var context = this;
        if (context.autoplay) {
            context.video.mute();
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

    timeUpdate(e) {
        var context = this;
        var video = context.video;
        if (!context.timeUpdateInterval && context.playVideo) {
            context.timeUpdateInterval = setInterval(function() {
                context.dispatchPlayStatusEvent();
            }, 1000)
        }
    }
    
    _playPosition(targetTime) {
        targetTime = parseInt(targetTime);
        if (targetTime < 0) {
            return;
        }
        var context = this;
        if (context.playPositionReadyInterval) {
            clearInterval(context.playPositionReadyInterval);
        }
        context.playPositionReadyInterval = setInterval(function() {
            if (context.isReady && (context.youTube !== undefined)) {
                var video = context.video;
                if (context.youTube) {
                    var state = video.state;
                    var currentTime = video.currenttime;
                    if (currentTime === targetTime) {
                        clearInterval(context.playPositionReadyInterval);
                    } else {
                        video.seekTo(targetTime, true);
                        context.playPosition = -1;
                    }
                } else {
                    clearInterval(context.playPositionReadyInterval);
                    video.currentTime = targetTime;
                    context.playPosition = -1;
                }
            }
        }, 250);
    }

    playStatus(e) {
        var context = this;
        var video = context.video;
        if (!video) {
            return;
        }
        context.processingPlayStatus = true;
        switch (context.youTube) {
            case false:
                context.playVideo = (e.type === "play");
                context.pauseVideo = (e.type === "pause");
                context.playState = (e.type === "play") ? "playing" : "paused";
                break;
            case true:
                if (context.seekWhenPaused) {
                    video.pause();
                    context.seekWhenPaused = false;
                    context.processingPlayStatus = false;
                    return;
                }
                if ((e.detail.value === 3) && (context.playPosition)) {
                    if (!context.playVideo) {
                        // context.seekWhenPaused = true;
                        context.processingPlayStatus = false;
                        var pauseInterval = setInterval(function() {
                            var playPosition = parseInt(context.playPosition) || 0;
                            if (playPosition === video.currenttime) {
                                clearInterval(pauseInterval);
                                setTimeout(function() {
                                    context.playVideo = false;
                                    context.pauseVideo = true;
                                    context.processingPlayStatus = false;
                                    video.pause();
                                }, 500)
                            }
                        }, 50)
                        return;
                    }
                }
                context.playVideo = (e.detail.value === 1);
                context.pauseVideo = (e.detail.value === 2);
                context.playState = (e.detail.value === 1) ? "playing" : "paused";
                break;
        }
        if (context.playVideo) {
            if (context.youTube) {
                video.chromeless = false;
            } else {
                video.controls = true;
            }
        }
        context.processingPlayStatus = false;
        if (context.playVideo && !context.timeUpdateInterval) {
            context.timeUpdate();
        }
        context.dispatchPlayStatusEvent();
    }

    dispatchPlayStatusEvent() {
        var context = this;
        var video = context.video;
        if (context.pauseVideo && context.timeUpdateInterval) {
            clearInterval(context.timeUpdateInterval);
            context.timeUpdateInterval = 0;
        }
        var currentTimeProperty = context.youTube ? "currenttime" : "currentTime";
        context.dispatchEvent(new CustomEvent("playState", { 
            detail: { 
                playing: context.playVideo,
                paused: context.pauseVideo,
                state: context.playState,
                currentTime: parseInt(video[currentTimeProperty])
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
            if (context.isReady && !context.processingPlayStatus) {
                setTimeout(function() {
                    if (context.youTube) {
                        video.chromeless = true;
                    } else {
                        video.controls = false;
                    }
                }, 1)
            }
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
      this.playPosition = -1;
      this.bottomSpacing = 0;
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
                maxHeight -= context.bottomSpacing;
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
                    context.width = adjWidth - 1;
                    context.height = adjHeight - 1;
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