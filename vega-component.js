import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://cdn.jsdelivr.net/npm/vega@5';


/**
 * `vega-component`
 * A generic-container which also allows Vega Visualizations to be rendered within it.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class VegaComponent extends PolymerElement {
    static get template() {
        return html`
        <style>
            .noSelect {
                user-select: none;
            }
          </style>
          <div class="main noSelect" style="width: 100%; height: 100%;">
            <div id="content"><div on-click="guidance" style="cursor: pointer; width: 100%; height: 100%;">Click for Guidance on using the <b>vega-component</b>...</div>
          </div>
        `;
      }
  
    static get properties() {
      return {
        id: {
          type: String
        },
        category: {
          type: String
        },
        backgroundOpacity: {
            type: Number
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        chartWidth: {
            type: Number
        },
        chartHeight: {
            type: Number
        },
        internalInteractionMap: {
            type: Object
        },
        updateDataMap: {
            type: String,
            observer: '_updateDataMapChanged'
        },
        updateDataMapJSON: {
            type: Object
        },
        currentItemId: {
            type: String
        },
        selectedItemId: {
            type: String
        },
        vegaSpecUrl: {
          type: String,
          observer: '_vegaSpecUrlChanged'
        },
        vegaSpec: {
          type: Object,
          observer: '_vegaSpecJsonChanged'
        },
        vegaRenderCallback: {
          type: Object
        },
        vegaData: {
            type: Object,
            observer: '_vegaDataChanged'
        },
        addedVegaData: {
            type: Object,
            observer: '_addVegaData'
        },
        referenceItem: {
            type: Object
        },
        maxVegaDataItems: {
            type: Number
        },
        vegaDataMap: {
          type: Object
        },
        vegaView: {
          type: Object
        },
        items: {
          type: Object
        },
        itemsMap: {
          type: Object
        },
        vegaDataSetName: {
          type: String,
          observer: '_vegaDataChanged'
        },
        dataSetName: {
          type: String,
          observer: '_dataSetNameChanged'
        },
        resizeInterval: {
            type: Number
        },
        bestFit: {
          type: Boolean
        },
        hideGuidance: {
          type: Boolean,
          observer: '_hideGuidance'
        },
        internalEvents: {
          type: Boolean
        },
        lastScale: {
          type: Number
          },
        originalWidth: {
          type: Number
        },
        originalHeight: {
          type: Number
        }
      }
    }

    constructor() {
      super();
      this.vegaRenderCallback = null;
      this.vegaSpec = null;
      this.vegaSpecUrl = null;
      this.vegaData = null;
      this.vegaView = null;
      this.addedVegaData = null;
      this.referenceItem = null;
      this.maxVegaDataItems = 0;
      this.currentItemId = "";
      this.selectedItemId = "";
      this.dataSetName = "";
      this.internalInteractionMap = {};
      this.updateDataMapJSON = {};
      this.vegaDataMap = {};
      this.resizeInterval = 0;
      this.width = 0;
      this.height = 0;
      this.chartWidth = 0;
      this.chartHeight = 0;
      this.height = 0;
      this.bestFit = false;
      this.internalEvents = false;
      this.hideGuidance = false;
      this.guidanceMarkup = "https://tonysoft.github.io/vegaTest/guidance.html";
    }

    ready() {
      var context = this;
      super.ready();
      context.isReady = true;
      context.adjustWidthHeight(false);
      for (var prop in context.onReadyProps) {
          context[prop] = context.onReadyProps[prop];
      }
  }

  adjustWidthHeight(bRender) {
    var context = this;
    var origChartWidth = context.chartWidth;
    var origChartHeight = context.chartHeight;
    if (!context.width || !context.height || bRender) {
      var elements = document.querySelectorAll("vega-component");
      elements.forEach(function(element) {
          if (!element.style.width) {
            element.style.width = "100%";
          }
          if (!element.style.height) {
            element.style.height = "100%";
          }
      })
      var wrapper = context.shadowRoot.querySelector('.main');
      if (!context.width || bRender) {
        context.width = Math.max((wrapper.offsetWidth ? wrapper.offsetWidth : context.chartWidth), context.chartWidth, 200);
      } else {
        context.chartWidth = context.width;
      }
      if (!context.height || bRender) {
        context.height = Math.max((wrapper.offsetHeight ? wrapper.offsetHeight : context.chartHeight), context.chartHeight, 150);
      } else {
        context.chartHeight = context.height;
      }
    }
    if (!context.chartWidth || bRender) {
      context.chartWidth = context.width;
    }
    if (!context.chartHeight || bRender) {
      context.chartHeight = context.height;
    }
    if (bRender) {
      if ((origChartHeight !== context.chartHeight) || (origChartWidth !== context.chartWidth)) {
        var vegaTarget = context.shadowRoot.querySelector("#content");
        context.vegaRender(context.vegaSpec, vegaTarget);
      }
    }
  }

  _vegaSpecUrlChanged(newValue) {
      var context = this;
      var vegaTarget = context.shadowRoot.querySelector("#content");
      if (vegaTarget && newValue) {
        fetch(newValue)
          .then(res => res.json())
          .then(spec => context.preVegaRender(spec, vegaTarget))
          .catch(err => console.error(err));
      } else {
        if (this.vegaRenderCallback) {
          this.vegaRenderCallback();
        }
      }
    }

    preVegaRender(spec, vegaTarget) {
      var context = this;
      if (context.vegaSpec && context.vegaData) {
        var oldSpec = JSON.stringify(context.vegaSpec)
        var newSpec = JSON.stringify(spec);
        if ((oldSpec !== "{}") && (newSpec !== oldSpec)) {
          context.vegaData = null;
        }
      }
      context.vegaRender(spec, vegaTarget);
      context.dispatchEvent(new CustomEvent("specChanged", { 
        detail: true
      }));
    }

    _updateDataMapChanged(newValue) {
        var context = this;
        fetch(newValue)
        .then(res => res.json())
        .then(spec => setUpdateDataMapJSON(spec))
        .catch(err => console.error(err));

        function setUpdateDataMapJSON(spec) {
            context.updateDataMapJSON = spec
        }
    }
    
    _vegaSpecJsonChanged(newValue) {
      var context = this;
      if (!newValue || !newValue["$schema"]) {
        return;
      }
      if (newValue.indexOf && (newValue.indexOf("{") === 0)) {
        try {
          newValue = JSON.parse(newValue);
        } catch(e) {
          return;  
        }
      }
      if (newValue.indexOf) {
        return;  // sometimes we get a bogus value (a string) on init...
      }
      var vegaTarget = context.shadowRoot.querySelector("#content");
      if (vegaTarget) {
        context.preVegaRender(newValue, vegaTarget);
        if (context.vegaData) {
          context.vegaUpdate(context.vegaDataSetName, context.vegaData, true);
        }
      } else {
        if (this.vegaRenderCallback) {
          this.vegaRenderCallback();
        }
      }
    }

    _dataSetNameChanged(newData) {
      var context = this;
      if (newData) {
        context.vegaDataSetName = newData;
      }
    }

    _dataChanged(newValue) {
      var context = this;
      var vegaData = JSON.parse(newValue);
      console.log(vegaData);
      // context.vegaData = vegaData;
    }

    _vegaDataChanged(newData) {
      var context = this;
      if (newData) {
        var dataChangedInterval = setInterval(function() {
          if (context.vegaView) {
            clearInterval(dataChangedInterval);
            context.vegaUpdate(context.vegaDataSetName, context.vegaData, true);
            context.createVegaDataMap(context.vegaData);
          }
        }, 50)
      }
    }

    _addVegaData(newData) {
        var context = this;
        if (!newData) {
            return;
        }
        if (newData.forEach) {
            var updatedData = context.getVegaData();
            // var updatedData = context.vegaData ? JSON.parse(JSON.stringify(context.vegaData)) : [];
            newData.forEach(function(newItem) {
                updatedData.push(newItem);
            })
            if ((context.maxVegaDataItems > 0) && (updatedData.length > context.maxVegaDataItems)) {
                var toRemove = updatedData.length - context.maxVegaDataItems;
                updatedData.splice(0, toRemove);
            }
            context.vegaData = updatedData;
        }
    }

    getVegaData() {
         var context = this;
         var vegaData = [];
         if (context.referenceItem && context.vegaData) {
            var refItem = JSON.stringify(context.referenceItem);
            context.vegaData.forEach(function(item) {
                var itemString = JSON.stringify(item);
                if (itemString !== refItem) {
                    vegaData.push(item);
                }
            })
         } else if (context.vegaData) {
            vegaData = JSON.parse(JSON.stringify(context.vegaData));
         }
         return vegaData;
    }

    createVegaDataMap(vegaData) {
      if (!vegaData || !vegaData.forEach) {
        return;
      }
      var context = this;
      context.vegaDataMap = {};
      vegaData.forEach(function(item) {
        if (item.id) {
          context.vegaDataMap[item.id] = item;
        }
      })
    }

    vegaUpdate(dataSetName, data, bRender, callback) {
      var context = this;
      var handled = false;
      if (!data) {
          return handled;
      }
      // if (!data.length) {
      //   data = [];
      // }
      if (context.referenceItem && data.forEach) {
          data.push(context.referenceItem);
      }
      if (context.vegaSpec && context.vegaSpec.data && context.vegaSpec.data.forEach) {
        var dataSet = null;
        dataSet = context.vegaSpec.data[0];
        context.vegaSpec.data.forEach(function(set) {
          if (data.length) {
            if (set.name === dataSetName) {
              dataSet = set;
            }
          } else {
            var dataName = set.name;
            if (dataName && data[dataName]) {
              delete set.url;
              set.values = data[dataName];
            }
          }
        })
        if (dataSet && data.length) {
          if (data.length) {
            delete dataSet.url;
            dataSet.values = data;
          }
        }
        if (bRender) {
          context.vegaRender(context.vegaSpec, undefined, callback);
        }
      }
    }

    internalInteraction(interaction, rawItem) {
        var context = this;
        var handled = false;
        if (!context.internalEvents) {
          return handled;
        }
        var item = rawItem ? rawItem.datum : null;
        if (!item) {
            return handled;
        }
        var itemId = item.id;
        if (!itemId) {
            return handled;
        }
        switch (interaction) {
            case "click":
                if ((context.selectedItemId === itemId) && context.internalInteractionMap["secondClick"]) {
                    interaction = "secondClick";
                }
                break;
        }
        var handlerTag = context.internalInteractionMap[interaction];
        if (handlerTag && context[handlerTag]) {
            handled = context[handlerTag](item.id, item);
        }
        return handled;
    }

    highlightTreePath(itemId) {
      if (!itemId) {
          return;
      }
      var context = this;
      if (!context.backgroundOpacity) {
        return;
      }
      if (context.itemsMap) {
        context.itemsMap.forEach(function(itemsMap) {
          for (var id in itemsMap) {
            var opacity = itemId ? context.backgroundOpacity : 1.0;
            var item = itemsMap[id];
            item._svg.style.opacity = opacity;
          }
          if (itemId) {
            var targetItem = itemsMap[itemId];
            while (targetItem) {
              targetItem._svg.style.opacity = 1.0;
              var parentId = targetItem.datum.parent;
              targetItem = parentId ? itemsMap[parentId] : null;
            }
          }
        })
        context.selectedItemId = itemId;
        return true;
      }
    }

    vegaRender(spec, vegaTarget, callback) {
      var context = this;
      context.vegaSpec = spec;
      if (context.chartWidth) {
        context.vegaSpec.width = context.chartWidth;
      }
      if (context.chartHeight) {
        context.vegaSpec.height = context.chartHeight;
      }
      if (spec.internalInteractionMap) {
          context.internalInteractionMap = spec.internalInteractionMap;
      }
      if (!callback) {
        callback = context.vegaRenderCallback
      }
      if (!vegaTarget) {
        vegaTarget = context.shadowRoot.querySelector("#content");
      }
      var view = new vega.View(vega.parse(spec), {
        renderer:  'svg',  // renderer (canvas or svg)
        container: vegaTarget,   // parent DOM container
        hover:     true       // enable hover processing
      });
      context.vegaView = view;
      context.items = null;
      if (callback) {
        callback(context, view);
      }
      setTimeout(function() {
        try {
          context._getItemNodes(context.vegaView.info()._scenegraph.root.items[0].items); //context.vegaView.info()._scenegraph.root.items[0].items[0].items
        } catch(e) {};
        context.scaleIfNecessary();
      }, 500);
      context.vegaEvents(view);
      context.dispatchEvent(new CustomEvent("rendered", { 
        detail: context.vegaData
      }));
    return view.runAsync();
    }

    _getItemNodes(items) {
      var context = this;
      context.items = [];
      items.forEach(function(marks) {
        var testMark = marks.items[0];
        if (testMark.datum.entity && testMark.datum.id) {
          context.items.push(marks.items);
        }
      })
      context._buildItemsMap();
      //context.items = context.vegaView.info()._scenegraph.root.items[0].items[0].items;
    }

    _buildItemsMap() {
      var context = this;
      context.itemsMap = [];
      context.items.forEach(function(items) {
        var itemsMap = {};
        items.forEach(function(item) {
          var itemId = item.datum.id;
          if (itemId) {
            itemsMap[itemId] = item;
          }
        })
        context.itemsMap.push(itemsMap);
      })
    }

    vegaEvents(view) {
      var context = this;
      view.addEventListener('click', function(event, item) {
        event.stopPropagation();
        if (!context.internalInteraction("click", item)) {
            dispatchEvent(event, "click", item);
        }
      })
      view.addEventListener('mouseover', function(event, item) {
        event.stopPropagation();
        dispatchEvent(event, "mouseover", item);
      })
      view.addEventListener('mouseout', function(event, item) {
        event.stopPropagation();
        dispatchEvent(event, "mouseout", item);
      })

      function dispatchEvent(event, interaction, vegaItem) {
        var rawItem = vegaItem ? vegaItem : { datum: {} };
        var item = rawItem.datum ? rawItem.datum : {};
        var itemId = item.id;
        if (context.vegaDataMap[itemId]) {
          item = context.vegaDataMap[itemId];
          item.vegaItem = false;
        }
        else {
          item.vegaItem = true;
        }
        context.dispatchEvent(new CustomEvent(interaction, { 
          detail: { 
            chartId: context.id,
            itemId: itemId,
            category: context.category,
            interaction: interaction,
            item: item,
            items: context.vegaDataMap
          }
        }));
      }
    }

    scaleIfNecessary() {
        var context = this;
        if (context.bestFit) {
            if (!context.originalWidth && context.parentNode) {
              context.originalWidth = context.parentNode.offsetWidth;
              context.originalHeight = context.parentNode.offsetHeight;
            }
            if (context.resizeInterval) {
                clearInterval(context.resizeInterval);
            }
            function doScale() {
                if (!context.parentNode) {
                  return;
                }
                var vegaContainer = context.shadowRoot.querySelector("svg.marks");
                if (vegaContainer) {
                    var vegaWidth = vegaContainer.clientWidth;
                    var vegaHeight = vegaContainer.clientHeight;
                    var padding = context.parentNode.style.padding;
                    padding = padding ? parseInt(padding.replace("px", "")) : 0;
                    var remixAppParent = document.querySelector("remix-sg-viewer#inspector-out_2");
                    if (!remixAppParent) {
                      remixAppParent = document.querySelector(".remix-app-parent");
                    }
                    if (remixAppParent) {
                        var maxWidth = remixAppParent.offsetWidth;
                        var maxHeight = remixAppParent.offsetHeight;
                        var transform = "";
                        var scale = 1.0;
                        var adjWidth = "";
                        var adjHeight = "";
                        var translateX = 0;
                        var translateY = 0;
                        if ((vegaWidth > maxWidth) || (vegaHeight > maxHeight)) {
                            var horzScale = maxWidth / vegaWidth;
                            var vertScale = maxHeight / vegaHeight;
                            if (horzScale < vertScale) {
                              scale = horzScale;
                              adjHeight = parseInt(context.originalHeight * scale) + "px";
                              translateY = (maxHeight * (1 - scale)) / -4;
                              translateY += padding * 2;
                              translateY = (translateY > 0) ? 0 : translateY;
                              transform = "translate(" + translateX + "px," + translateY + "px) scale(" + scale + ")"
                            }
                            else {
                              scale = vertScale;
                              translateX = (maxWidth * (1 - scale)) / -4;
                              translateX += padding * 2;
                              translateX = (translateX > 0) ? 0 : translateX;
                              transform = "translate(" + translateX + "px," + translateY + "px) scale(" + scale + ")"
                              // adjWidth = parseInt(context.originalWidth * scale) + "px";
                            }
                        }
                        if (context.lastScale !== scale) {
                          context.style.transform = transform;
                          context.style.width = adjWidth;
                          context.style.height = adjHeight;
                          context.lastScale = scale;
                        }
                    }
                }
            }
            doScale();
            context.resizeInterval = setInterval(function() {
                doScale();
            }, 1000);
        } else {
          if (!context.resizeInterval) {
            context.resizeInterval = setInterval(function() {
              context.adjustWidthHeight(true);
          }, 1000);
        }
        }
    }
    _hideGuidance(newValue) {
      var context = this;
      if (newValue) {
        var target = context.shadowRoot.querySelector("#content");
        target.innerHTML = "";
      }
  }
    guidance(e) {
        e.stopPropagation();
        var context = this;
        var target = context.shadowRoot.querySelector("#content");
        this.loadFile(context.guidanceMarkup, function(markup) {
            target.innerHTML = markup;
        }, function(error) {
            target.innerHTML = "No guidance available...";
        })
    }
    loadFile(filePath, success, error) {
        var response = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, true);
        xmlhttp.onload = function (e) {
          if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
              success(xmlhttp.responseText);
            } else {
              error(xmlhttp.statusText);
            }
          }
        };
        xmlhttp.onerror = function (e) {
          error(xmlhttp.statusText);
        };
        xmlhttp.send();
    }
}


window.customElements.define('vega-component', VegaComponent);
export { VegaComponent }