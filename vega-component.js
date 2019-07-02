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
        vegaSpec: {
          type: String,
          reflectToAttribute: true,
          observer: '_vegaSpecChanged'
        },
        vegaSpecJSON: {
          type: Object,
          observer: '_vegaSpecJSONChanged'
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
        }
      }
    }

    constructor() {
      super();
      this.vegaRenderCallback = null;
      this.vegaData = null;
      this.vegaView = null;
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

    _vegaSpecJSONChanged(newValue) {
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

    vegaUpdate(dataSetName, data, bRender, callback) {
      var context = this;
      if (context.vegaSpecJSON && context.vegaSpecJSON.data) {
        var dataSet = null;
        context.vegaSpecJSON.data.forEach(function(set) {
          if (set.name === dataSetName) {
            dataSet = set;
            delete dataSet.url;
            dataSet.values = data;
          }
        })
        if (dataSet && bRender) {
          context.vegaRender(context.vegaSpecJSON, undefined, callback);
        }
      }
    }

    highlightTreePath(itemId) {
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
      }
    }

    vegaRender(spec, vegaTarget, callback) {
      var context = this;
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
        dispatchEvent(event, "click", item);
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

}


window.customElements.define('vega-component', VegaComponent);
export { VegaComponent }