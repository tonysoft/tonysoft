import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {GestureEventListeners} from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import * as Gestures from '@polymer/polymer/lib/utils/gestures.js';
import {} from '@polymer/polymer/lib/mixins/property-effects.js';

class SortableList extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                }

                ::slotted(*) {
                    user-drag: none;
                    user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    -webkit-user-drag: none;
                    -webkit-user-select: none;
                    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
                    displayx: inline-block;
                }

                ::slotted(.item--transform) {
                    left: 0px;
                    marginx: 0 !important;
                    position: fixed !important;
                    top: 0px;
                    transition: transform 0.2s cubic-bezier(0.333, 0, 0, 1);
                    will-change: transform;
                    z-index: 1;
                }

                ::slotted(.item--pressed) {
                    transition: none !important;
                }

                ::slotted(.item--dragged) {
                    -webkit-box-shadowx: 0 2px 10px rgba(0, 0, 0, 0.2);
                    box-shadowx: 0 2px 10px rgba(0, 0, 0, 0.2);
                    filter: brightness(1.1);
                    z-index: 2;
                }

                #items {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                #main {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                #slot {
                    display: flex;
                    flex-wrap: wrap;
                }
            </style>
            <div id="main">
                <div id="items">
                    <slot id="slot"></slot>
                </div>
            </div>
        `;
    }

    static get properties() {
        return {
            sortable: String,
            parentSortable: String,
            items: {
                type: Array,
                notify: true,
                readOnly: true
            },

            data: {
                type: Array,
                observer: "_data"
            },

            dragging: {
                type: Boolean,
                notify: true,
                readOnly: true,
                reflectToAttribute: true,
                value: false
            },

            disabled: {
                type: Boolean,
                reflectToAttribute: true,
                value: false
            },

            dragHandle: {
                type: String,
                reflectToAttribute: true,
                value: ""
            }
        };
    }

    constructor() {
        super();
        this._observer = null;
        this._target = null;
        this._targetRect = null;
        this._rects = null;
        this.data = null;
        this._onTrack = this._onTrack.bind(this);
        this._onDragStart = this._onDragStart.bind(this);
        this._onTransitionEnd = this._onTransitionEnd.bind(this);
        this._onContextMenu = this._onContextMenu.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
    }

    ready() {
        super.ready();
        var context = this;
        // We should avoid this sort of styling being baked into WCs
        // as other WCs won't have it and it is for the builder & runtime to manage that
        // context.style.width = "100%";
        // context.style.height = "100%";
        context.parentSortable = context.sortable ? "" : context.parentSortable || "rmx-webcomponent";
        context.sortable = context.sortable || "noMatch";
        setTimeout(function() {
            context._updateItems();
            context._observeItems();
            context._toggleListeners({ enable: true });
        }, 50);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._unobserveItems();
        this._toggleListeners({ enable: false });
    }

    _data(newData) {
        var context = this;
        context.priorItemOrder = null;
    }

    _updateItems() {
        var context = this;
        if (this.dragging) {
            return;
        }
        const items = [];
        this.querySelectorAll("*").forEach(node => {
            var parentNode = node.parentNode;
            var sortable = false;
            if (context.parentSortable && parentNode.classList.contains(context.parentSortable)) {
                sortable = true && node.nodeType === Node.ELEMENT_NODE && !node.template;
            }
            if (node.nodeType === Node.ELEMENT_NODE && (node.matches(this.sortable) || sortable)) {
                items.push(node);
            }
        });
        // if (context.parentSortable === "rmx-webcomponent") {
        //     var parentNode = context.parentNode;
        //     while (parentNode && (!parentNode.classList || !parentNode.classList.contains("remix-app-content"))) {
        //         parentNode = parentNode.parentNode;
        //     }
        //     if (parentNode) {
        //         context.boundingBoxAdj = parentNode.getBoundingClientRect();
        //     }
        // }
        if (!this.priorItemOrder) {
            this.priorItemOrder = [];
            context.dataMapping = {};
            items.forEach((item, idx) => {
                context.priorItemOrder.push(item.setAttribute("index", idx));
                if (context.data && (context.data[idx] !== undefined)) {
                    let mapping = { 
                        index: idx,
                        data: context.data[idx]
                    }
                    context.dataMapping[idx] = mapping;
                }
                if (context.dragHandle) {
                    var dragHandle = item.querySelector("*[data-rmx-meta]");
                    if (dragHandle) {
                        var dataRmxMeta = dragHandle.getAttribute("data-rmx-meta");
                        if (dataRmxMeta.indexOf(context.dragHandle) >= 0) {
                            dragHandle.style.cursor = "ns-resize";
                        }
                    }
                }
            });
        }
        this._setItems(items);
    }

    _observeItems() {
        if (!this._observer) {
            this._observer = new MutationObserver(_ => {
                this._updateItems();
            });
            this._observer.observe(this, { childList: true });
        }
    }

    _unobserveItems() {
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
    }

    _toggleListeners({ enable }) {
        const m = enable ? "addEventListener" : "removeEventListener";
        this.$.items[m]("dragstart", this._onDragStart);
        this.$.items[m]("transitionend", this._onTransitionEnd);
        this.$.items[m]("contextmenu", this._onContextMenu);
        this.$.items[m]("touchmove", this._onTouchMove);
        if (enable) {
            Gestures.addListener(this, "track", this._onTrack);
        } else {
            Gestures.removeListener(this, "track", this._onTrack);
        }
    }
    _onTrack(event) {
        var context = this;
        switch (event.detail.state) {
            case "start":
                this._trackStart(event);
                break;
            case "track":
                this._track(event);
                break;
            case "end":
                this._trackEnd(event);
                break;
        }
    }

    _trackStart(event) {
        if (this.disabled) {
            return;
        }
        if (this.dragHandle) {
            var dataRmxMeta = event.srcElement.getAttribute("data-rmx-meta") || event.srcElement.parentNode.getAttribute("data-rmx-meta");
            if (dataRmxMeta.indexOf(this.dragHandle) < 0) {
                return;
            }
        }
        this._target = this._itemFromEvent(event);
        if (!this._target) {
            return;
        }
        event.stopPropagation();
        this._rects = this._getItemsRects();
        this._targetRect = this._rects[this.items.indexOf(this._target)];
        this._target.classList.add("item--dragged", "item--pressed");
        if ("vibrate" in navigator) {
            navigator.vibrate(30);
        }
        const rect = this.getBoundingClientRect();

        this.style.height = rect.height + "px";
        this.style.width = rect.width + "px";
        this.items.forEach((item, idx) => {
            const rect = this._rects[idx];
            item.classList.add("item--transform");
            item.style.transition = "none";
            // item.__originalWidth = item.style.width;
            // item.__originalHeight = item.style.height;
            item.style.width = rect.width + "px";
            item.style.height = rect.height + "px";
            this._translate3d(rect.left, rect.top, 1, item);
            setTimeout(_ => {
                item.style.transition = null;
            }, 20);
        });
        this.priorItemOrder = [];
        var context = this;
        this.items.forEach(function(item) {
            context.priorItemOrder.push(item.getAttribute("index"));
        })
        this._setDragging(true);
    }

    _track(event) {
        if (!this.dragging) {
            return;
        }
        const left = this._targetRect.left + event.detail.dx;
        const top = this._targetRect.top + event.detail.dy;
        this._translate3d(left, top, 1, this._target);
        const overItem = this._itemFromCoords(event.detail);
        if (overItem && overItem !== this._target) {
            const overItemIndex = this.items.indexOf(overItem);
            const targetIndex = this.items.indexOf(this._target);
            this._moveItemArray(this.items, targetIndex, overItemIndex);
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i] !== this._target) {
                    const rect = this._rects[i];
                    requestAnimationFrame(_ => {
                        this._translate3d(rect.left, rect.top, 1, this.items[i]);
                    });
                }
            }
        }
    }

    // The track really ends
    _trackEnd(event) {
        if (!this.dragging) {
            return;
        }
        const rect = this._rects[this.items.indexOf(this._target)];
        this._target.classList.remove("item--pressed");
        this._setDragging(false);
        this._translate3d(rect.left, rect.top, 1, this._target);
    }

    _onDragStart(event) {
        event.preventDefault();
    }

    _onTransitionEnd() {
        if (this.dragging || !this._target) {
            return;
        }
        const fragment = document.createDocumentFragment();
        this.items.forEach(item => {
            item.style.transform = "";
            // item.style.width = item.__originalWidth;
            // item.style.height = item.__originalHeight;
            item.classList.remove("item--transform");
            fragment.appendChild(item);
        });
        var context = this;
        if (context.children[0]) {
            context.insertBefore(fragment, this.children[0]);
        } else {
            context.appendChild(fragment);
        }
        var display = context.style.display;
        context.style.display = "none";
        setTimeout(function() {
            context._target.classList.remove("item--dragged");
            context._rects = null;
            context._targetRect = null;
            context._updateItems();
            context.newItemOrder = [];
            var orderedData = [];
            var sortIndex = 100;
            context.items.forEach(function(item) {
                var index = item.getAttribute("index");
                if (context.dataMapping[index]) {
                    context.dataMapping[index].data.sort = sortIndex;
                    orderedData.push(context.dataMapping[index].data);
                    context.newItemOrder.push(parseInt(index));
                }
                sortIndex += 100;
            });
            let detail = {
                itemIndex: context._target.getAttribute("index"),
                newItemOrder: context.newItemOrder,
                priorItemOrder: context.priorItemOrder,
                orderedData: orderedData
            };
            context.dispatchEvent(
                new CustomEvent("sortFinish", {
                    composed: true,
                    detail
                })
            );
            
            context.style.display = display;
            context._target.scrollIntoView(false);
            context._target = null;
        });
   }

    _onContextMenu(event) {
        if (this.dragging) {
            event.preventDefault();
            this._trackEnd();
        }
    }

    _onTouchMove(event) {
        event.preventDefault();
    }

    _itemFromEvent(event) {
        const path = event.composedPath();
        for (var i = 0; i < path.length; i++) {
            if (this.items.indexOf(path[i]) > -1) {
                return path[i];
            }
        }
    }

    _itemFromCoords({ x, y }) {
        if (!this._rects) {
            return;
        }
        let match = null;
        this._rects.forEach((rect, i) => {
            if (x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height) {
                match = this.items[i];
            }
        });
        return match;
    }

    _getItemsRects() {
        var context = this;
        return this.items.map(item => {
            return context._getBoundingClientRect(item);
        });
    }

    _getBoundingClientRect(node) {
        var context = this;
        var boundingRect = node.getBoundingClientRect();
        var rect = {
            top: boundingRect.top,
            left: boundingRect.left,
            width: boundingRect.width,
            height: boundingRect.height
        };
        if (context.boundingBoxAdj) {
            rect.left -= context.boundingBoxAdj.left;
            rect.top -= context.boundingBoxAdj.top;
        }
        return rect;
    }

    _translate3d(x, y, z, el) {
        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }

    _moveItemArray(array, oldIndex, newIndex) {
        if (newIndex >= array.length) {
            var k = newIndex - array.length;
            while (k-- + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
        return array;
    }
}

customElements.define("sortable-list", SortableList);
