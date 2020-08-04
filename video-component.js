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
                overflow: hidden;
                position: relative;
            }
            .border {
                border: 1px solid #dddddd;
                border-radiusx: 10px;
            }
            .theVideo {
                width:100%;
                height:100%; 
                outline: none;
            }
          </style>
        <div class="main noSelect" style="top: [[top]]px; left: [[left]]px; width: [[setWidth(width)]]; height: [[setHeight(height)]];">
            <div style="display: [[isHTML5(youTube)]];" >
                <video src="" class$="theVideo [[hasBorder(border)]]" on-canplay="loaded" on-loadedmetadata="metadataLoaded" on-play="playStatus" on-pause="playStatus" muted></video>
            </div>
            <div style="display: [[isYouTube(youTube)]];" >
                <google-youtube class$="theVideo youTube [[hasBorder(border)]]" video-id="..." rel="0" on-state-changed="playStatus" on-google-youtube-ready="youTubeReady"></google-youtube>
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
        border: {
            type: Boolean
        },
        componentId: {
            type: String
        },
        nodeActionPackets: {
            type: Array,
            observer: "_nodeActionPackets"
        },
        resumePlayPosition: {
            type: Number,
            observer: "_resumePlayPosition"
        },
        playPosition: {
            type: Number,
            observer: "_playPosition"
        },
        pausePosition: {
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
        spacingBottom: {
            type: Number
        },
        spacingRight: {
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


    constructor() {
        super();
        this.width = 0;
        this.height = 0;
        this.left = 0;
        this.top = 0;
        this.src = "http://NoVideo";
        this.bestFit = false;
        this.centered = "";
        this.autoplay = false;
        this.isReady = false;
        this.playVideo = false;
        this.pauseVideo = false;
        this.muted = false;
        this.showControls = true;
        this.playPosition = -1;
        this.pausePosition = -1;
        this.spacingBottom = 0;
        this.spacingRight = 0;
        this.border = false;
        this.resumePlayPosition = -1;
        this.video = null;
        this.componentId = "";
    }
  
      ready() {
        var context = this;
        super.ready();
        context.setVideoType();
        context.isReady = true;
        if (!context.width || !context.height) {
            var elements = document.querySelectorAll("video-component");
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
        context.scaleIfNecessary();
    }

    hasBorder(border) {
        var context = this;
        if (border) {
            return "border";
        } else {
            return "";
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

    setVideoType() {
        var context = this;
        if (context.video) {
            try {
                context.video.pause();
            } catch(e) {}
        }
        if (context.youTube) {
            context.video = context.shadowRoot.querySelector(".youTube");
        } else {
            if (context.shadowRoot.querySelector("video").offsetHeight > context.shadowRoot.querySelector(".main").offsetHeight) {
                context.shadowRoot.querySelector("video").style.height = document.querySelector("video-component").offsetHeight + "px";
            }
            if (context.shadowRoot.querySelector("video").offsetWidth > context.shadowRoot.querySelector(".main").offsetWidth) {
                context.shadowRoot.querySelector("video").style.width = context.shadowRoot.querySelector(".main").offsetWidth + "px";
            }
            context.video = context.shadowRoot.querySelector("video");
        }
        context.showControlsBar(context.showControls);
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

    _nodeActionPackets(actionPackets) {
        var context = this;
        var packetsToProcess = [];
        setTimeout(function() {
            if (context.nodeActionPackets.length > 0) {
                var packetIndex = 0;
                function processActionPacket(actionPacket, processNextActionPacket) {
                    var actionDef = actionPacket.action;
                    var commands = context.extractCommands(actionDef);
                    var katoms = context.extractKatoms(actionDef, actionPacket.target === context.componentId);
                    if (actionPacket.target === context.componentId) {
                        var packet = { type: "video", target: context.componentId, cascadingKatoms: katoms};
                        packetsToProcess.push(packet);
                        if (commands && (commands.length > 0)) {
                            packet.src = commands[0];
                            if (commands.length > 1) {
                                var startPos = parseInt(commands[1]);
                                if (!isNaN(startPos)) {
                                    packet.startPos = startPos;
                                }
                                if (commands.length > 2) {
                                    var endPos = parseInt(commands[2]);
                                    if (!isNaN(endPos)) {
                                        packet.endPos = endPos;
                                    }
                                }
                                if ((commands.length > 3) && (commands[3].toLowerCase().indexOf("play") === 0)) {
                                    packet.play = true;
                                    var tries = 0;
                                    packet.segmentCompleted = (commands[3].split(">>").length > 1) ? commands[3].split(">>")[1].trim() : "";
                                }
                            }
                        }
                        processNextActionPacket(katoms);
                    } else {
                        processNextActionPacket(katoms);
                    }
                }
                function nextActionPacket(katoms) {
                    accumulatedKatoms = accumulatedKatoms.concat(katoms);
                    packetIndex++;
                    if (packetIndex < context.nodeActionPackets.length) {
                        processActionPacket(context.nodeActionPackets[packetIndex], nextActionPacket);
                    } else {
                        var targetedPackage = { packetsToProcess: packetsToProcess };
                        context.processNodeActionPackets(targetedPackage);
                    }
                }
                processActionPacket(context.nodeActionPackets[packetIndex], nextActionPacket)
            }
        })
    }

    processNodeActionPackets(targetedPackage) {
        var packetsToProcess = targetedPackage.packetsToProcess;
        var context = this;
        setTimeout(function() {
            if (packetsToProcess.length > 0) {
                var packetIndex = 0;
                function processActionPacket(actionPacket, processNextActionPacket) {
                    if (actionPacket.target === context.componentId) {
                        accumulatedKatoms = accumulatedKatoms.concat(actionPacket.cascadingKatoms);
                        if (actionPacket.src && (context.src !== actionPacket.src)) {
                            context.src = actionPacket.src;
                        }
                        if (actionPacket.startPos) {
                            var startPos = parseInt(actionPacket.startPos);
                            if (!isNaN(startPos)) {
                                setTimeout(function() {
                                    context.playPositionSet = false;
                                    context.playPosition = -1;
                                    context.playPosition = startPos;
                                })
                            }
                            if (actionPacket.endPos) {
                                var endPos = parseInt(actionPacket.endPos);
                                if (!isNaN(endPos)) {
                                    setTimeout(function() {
                                        context.pausePosition = -1;
                                        context.pausePosition = endPos;
                                    })
                                }
                            }
                            if (actionPacket.play) {
                                var tries = 0;
                                context.segmentCompleted = actionPacket.segmentCompleted;
                                if (context.playPositionSetInterval) {
                                    clearInterval(context.playPositionSetInterval);
                                }
                                context.playPositionSetInterval = setInterval(function() {
                                    tries++;
                                    if ((context.playPositionSet) || (tries > 3)) {
                                        clearInterval(context.playPositionSetInterval);
                                        context.playPositionSetInterval = null;
                                        context.playPositionSet = false;
                                        context.play();
                                    }
                                }, 1000)
                            }
                        }
                        processNextActionPacket();
                    } else {
                        processNextActionPacket();
                    }
                }
                var accumulatedKatoms = [];
                function nextActionPacket() {
                    packetIndex++;
                    if (packetIndex < packetsToProcess.length) {
                        processActionPacket(packetsToProcess[packetIndex], nextActionPacket);
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
                processActionPacket(packetsToProcess[packetIndex], nextActionPacket)
            }
        })
    }

    extractCommands(actionDef) {
        var commands = [];
        actionDef.forEach(function(action) {
            action = action.trim();
            if (action.trim().indexOf(">>") !== 0) {
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

    setSrc(newValue) {
        var context = this;
        var probablyYouTube = (newValue.indexOf("/") < 0);
        if (probablyYouTube) {
            context.youTube = true;
            // var wrapper = context.shadowRoot.querySelector('.main');
            // if (!context.width) {
            //   context.width = Math.max((wrapper.offsetWidth ? wrapper.offsetWidth : 360), 360);
            // }
            // if (!context.height) {
            //   context.height = Math.max((wrapper.offsetHeight ? wrapper.offsetHeight : 203), 203);
            // }
        } else {
            context.youTube = false;
        }
        context.setVideoType();

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
        } else {
            // setTimeout(function() {
            //     context.ignoreDispatch = true;
            //     context.playVideo = true;
            //     setTimeout(function() {
            //         // context.video.pause();
            //         // context.playPosition = 0;
            //     }, 2000);
            // }, 1000);
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

    _resumePlayPosition(targetTime, oldValue) {
        var context = this;
        if (targetTime < 0) {
            return;
        } else {
            if (targetTime === 0) {
                context.resumePlayPosition = oldValue;
            }
        }
    }
    
    _playPosition(targetTime, callback) {
        var context = this;
        context.playPositionHelper(targetTime);
    }

    playPositionHelper(targetTime, callback) {
        var context = this;
        targetTime = parseInt(targetTime);
        if (targetTime < 0) {
            return;
        }
        if (targetTime === 0) {
            context.resumePlayPosition = -1;
        }
        if (context.playPositionReadyInterval) {
            clearInterval(context.playPositionReadyInterval);
        }
        context.playPositionReadyInterval = setInterval(function() {
            if (context.isReady && (context.youTube !== undefined)) { // && context.video) {
                var video = context.video;
                if (context.youTube) {
                    var state = video.state;
                    var currentTime = video.currenttime;
                    if (currentTime === targetTime) {
                        clearInterval(context.playPositionReadyInterval);
                        context.playPositionSet = true;
                        if (callback) {
                            callback();
                        }
                    } else {
                        try {
                            video.seekTo(targetTime, true);
                            context.playPosition = -1;
                        } catch(e) {
                            clearInterval(context.playPositionReadyInterval);
                        }
                    }
                } else {
                    clearInterval(context.playPositionReadyInterval);
                    if (callback) {
                        callback();
                    }
                    video.currentTime = targetTime;
                    context.playPositionSet = true;
                    context.playPosition = -1;
                }
            }
        }, 250);
    }

    playStatus(e) {
        var context = this;
        if ((context.youTube === undefined) && (context.src)) {
            context.setSrc(context.src);
        }
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
        if (context.ignoreDispatch) {
            context.ignoreDispatch = false;  // For YouTube Startup Hack.
            return;
        }
        var video = context.video;
        if (context.pauseVideo && context.timeUpdateInterval) {
            clearInterval(context.timeUpdateInterval);
            context.timeUpdateInterval = 0;
        }
        var currentTimeProperty = context.youTube ? "currenttime" : "currentTime";
        var currentTime = parseInt(video[currentTimeProperty]);
        var playing = (context.playState === "playing");

        if (context.youTube && (video.state === -1)) {  // YouTube gets confused if you choose a playPosition before the first play
            video.pause();
        }
        if ((context.pausePosition > context.playPosition) && (currentTime >= context.pausePosition)) {
            video.pause();
            //if (context.youTube) {
                context.pausePosition = -1;
                if (context.segmentCompleted) {
                    setTimeout(function() {
                        context.dispatchEvent(new CustomEvent("segmentCompleted", { 
                            detail: [context.segmentCompleted]
                        }));
                        context.segmentCompleted = "";
                    }, 500);
                }
            //}
            playing = false;
        }
        context.dispatchEvent(new CustomEvent("playState", { 
            detail: { 
                playing: playing,
                currentTime: currentTime
            }
        }));
    }

    applyPlayState() {
        var context = this;
        if (context.playVideo) {
            context.play();
        } else {
            context.pause();
        }
    }

    play() {
        var context = this;
        context._playVideo(true);
    }

    _playVideo(newValue) {
        var context = this;
        var video = context.video;
        if (newValue) {
            context.pauseVideo = false;
           context.playTheVideo();
        }
    }

    pause() {
        var context = this;
        context._pauseVideo(true);
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
        if (context.resumePlayPosition > 0) {
            this.playPositionHelper(context.resumePlayPosition, function() {
                context.resumePlayPosition = -1;
                video.play();
            })
        } else {
            video.play();
        }
    }

    pauseTheVideo() {
        var context = this;
        var video = context.video;
        video.pause();
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
                var leftOffset = 0;
                if (!remixAppParent) {
                    remixAppParent = document.querySelector(".remix-app-parent");
                }
                if (remixAppParent) {
                    maxWidth = remixAppParent.offsetWidth;
                    maxHeight = remixAppParent.offsetHeight;
                    var parentGroup = context.parentNode;
                    topOffset = parentGroup.offsetTop;
                    leftOffset = parentGroup.offsetLeft;
                }
                else {
                    topOffset = context.offsetTop;
                    leftOffset = context.offsetLeft;
                }
                maxHeight -= topOffset;
                maxWidth -= leftOffset;
                maxHeight -= context.spacingBottom;
                maxWidth -= context.spacingRight;
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
        } else {
            function doScale() {
                var main = context.shadowRoot.querySelector(".main");
                var width = main.offsetWidth;
                var height = main.offsetHeight;
                if ((width !== context.originalWidth) || (height !== context.originalHeight)) {
                    context.originalWidth = main.offsetWidth;
                    context.originalHeight = main.offsetHeight;
                    if (context.youTube) {
                        var youTube = context.shadowRoot.querySelector(".youTube");
                        if (youTube && youTube.shadowRoot) {
                            var container = youTube.shadowRoot.querySelector("#container");
                            if (container) {
                                if (!context.youTubeAspect) {
                                    context.youTubeAspect = container.offsetWidth / container.offsetHeight;
                                }
                                var componentAspect = width / height;
                                if (componentAspect < context.youTubeAspect) {
                                    var proposedHeight = height;
                                    height = width / context.youTubeAspect;
                                    container.style.position = "relative";
                                    container.style.left = "0px";
                                    container.style.top = (proposedHeight - height) / 2 + "px";
                                } else {
                                    var proposedWidth = width;
                                    width = height * context.youTubeAspect;
                                    container.style.position = "relative";
                                    container.style.top = "0px";
                                    container.style.left = (proposedWidth - width) / 2 + "px";
                                }
                                container.style.width = width + "px";
                                container.style.height = height + "px";
                            }
                        }
                    } else {
                        var container = context.shadowRoot.querySelector("video").parentNode;
                        if (!context.videoAspect) {
                            context.videoAspect = container.offsetWidth / container.offsetHeight;
                        }
                        var componentAspect = width / height;
                        if (componentAspect < context.videoAspect) {
                            var proposedHeight = height;
                            height = width / context.videoAspect;
                            container.style.position = "relative";
                            container.style.left = "0px";
                            container.style.top = (proposedHeight - height) / 2 + "px";
                        } else {
                            var proposedWidth = width;
                            width = height * context.videoAspect;
                            container.style.position = "relative";
                            container.style.top = "0px";
                            container.style.left = (proposedWidth - width) / 2 + "px";
                        }
                        container.style.width = width + "px";
                        container.style.height = height + "px";
            }
                }
            }
            var waitIntervale = context.youTube ? 1 : 500;
            setTimeout(function() {
                doScale();
            }, waitIntervale);
            context.resizeInterval = setInterval(function() {
                doScale();
            }, 1000);
        }
    }

}


window.customElements.define('video-component', VideoComponent);
export { VideoComponent }