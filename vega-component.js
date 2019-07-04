import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://cdn.jsdelivr.net/npm/vega@5';

/**
 * `vega-container`
 * A generic-container which also allows Vega Visualizations to be rendered within it.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class VegaComponent extends PolymerElement {
    static get template() {
        return html`
          <div class="main">
            <div id="content"></div>
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
        vegaSpec: {
          type: String,
          observer: '_vegaSpecChanged'
        },
        vegaSpecJson: {
          type: Object,
          observer: '_vegaSpecJsonChanged'
        },
        vegaRenderCallback: {
          type: Object
        },
        vegaData: {
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
          type: String
        },
        resizeInterval: {
            type: Number
        },
        bestFit: {
            type: Boolean
        }
      }
    }

    constructor() {
      super();
      this.vegaRenderCallback = null;
      this.vegaData = null;
      this.vegaView = null;
      this.currentItemId = "";
      this.selectedItemId = "";
      this.dataSetName = "";
      this.internalInteractionMap = {};
      this.updateDataMapJSON = {};
      this.resizeInterval = 0;
      this.bestFit = false;
    }

    _vegaSpecChanged(newValue) {
      var context = this;
      var vegaTarget = context.shadowRoot.querySelector("#content");
      if (vegaTarget) {
        fetch(newValue)
          .then(res => res.json())
          .then(spec => context.vegaRender(spec, vegaTarget))
          .catch(err => console.error(err));
      } else {
        if (this.vegaRenderCallback) {
          this.vegaRenderCallback();
        }
      }
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
      var vegaTarget = context.shadowRoot.querySelector("#content");
      if (vegaTarget) {
        if (context.width) {
            newValue.width = context.width;
        }
        if (context.height) {
            newValue.height = context.height;
        }
        context.vegaRender(newValue, vegaTarget);
      } else {
        if (this.vegaRenderCallback) {
          this.vegaRenderCallback();
        }
      }
    }

    _vegaDataChanged(newData) {
      var context = this;
      if (newData) {
        // var changeset = vega.changeset().remove(() => true).insert(newData);
        // context.vegaView.change(context.vegaDataSetName, changeset).runAsync();
        context.vegaUpdate(context.vegaDataSetName, context.vegaData, true);
        context.vegaDataSetName = "";
      }
    }

    dataUpdate(itemId) {
        var context = this;
        var handled = false;
        if (context.dataSetName && context.updateDataMapJSON[itemId]) {
            context.vegaUpdate(context.dataSetName, context.updateDataMapJSON[itemId], true);
            context.currentItemId = itemId;
            context.selectedItemId = "";
            handled = true;
        }
        return handled;
    }

    vegaUpdate(dataSetName, data, bRender, callback) {
      var context = this;
      var handled = false;
      if (context.vegaSpecJson && context.vegaSpecJson.data) {
        var dataSet = null;
        context.vegaSpecJson.data.forEach(function(set) {
          if (set.name === dataSetName) {
            dataSet = set;
            delete dataSet.url;
            dataSet.values = data;
          }
        })
        if (dataSet && bRender) {
          context.vegaRender(context.vegaSpecJson, undefined, callback);
        }
      }
    }

    internalInteraction(interaction, rawItem) {
        var context = this;
        var handled = false;
        var item = rawItem.datum;
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
      context.vegaSpecJson = spec;
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
        if (!context.internalInteraction("click", item)) {
            dispatchEvent(event, "click", item);
        }
      })
      view.addEventListener('mouseover', function(event, item) {
        dispatchEvent(event, "mouseover", item);
      })
      view.addEventListener('mouseout', function(event, item) {
        dispatchEvent(event, "mouseout", item);
      })

      function dispatchEvent(event, interaction, item) {
        context.dispatchEvent(new CustomEvent('interaction', { 
          detail: { 
            id: context.id,
            category: context.category,
            interaction: interaction,
            rawEvent: event,
            event: event,
            container: context,
            view: context.vegaView,
            item: item,
            items: context.items
          }
        }));
      }
    }

    scaleIfNecessary() {
        var context = this;
        if (context.bestFit) {
            if (context.resizeInterval) {
                clearInterval(context.resizeInterval);
            }
            var vegaContainer = context.shadowRoot.querySelector("svg.marks");
            if (vegaContainer) {
                var vegaWidth = vegaContainer.clientWidth;
                var vegaHeight = vegaContainer.clientHeight;
                var remixAppParent = document.querySelector(".remix-app-parent");
                if (remixAppParent) {
                    var maxWidth = remixAppParent.offsetWidth;
                    var maxHeight = remixAppParent.offsetHeight;
                    if ((vegaWidth > maxWidth) || (vegaHeight > maxHeight)) {
                        var horzScale = vegaWidth / maxWidth;
                        var vertScale = vegaHeight / maxHeight;
                        var i = 0;
                        i++;
                    }
                }
            }
        }
    }
}


window.customElements.define('vega-component', VegaComponent);
export { VegaComponent }