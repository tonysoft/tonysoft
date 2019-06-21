import {html, PolymerElement} from 'https://unpkg.com/tonysoft/@polymer/polymer/polymer-element.js';
import {GenericContainer} from 'https://unpkg.com/tonysoft/generic-container.js';

/**
 * `vega-container`
 * A generic-container which also allows Vega Visualizations to be rendered within it.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class VegaContainer extends GenericContainer {

    static get properties() {
      return {
        id: {
          type: String
        },
        category: {
          type: String
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
      var vegaTarget = context.querySelector("*[slot='content'");
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
      var vegaTarget = context.querySelector("*[slot='content'");
      if (vegaTarget) {
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

    vegaRender(spec, vegaTarget, callback) {
      var context = this;
      if (!callback) {
        callback = context.vegaRenderCallback
      }
      if (!vegaTarget) {
        vegaTarget = context.querySelector("*[slot='content'");
      }
      var view = new vega.View(vega.parse(spec), {
        renderer:  'svg',  // renderer (canvas or svg)
        container: vegaTarget,   // parent DOM container
        hover:     true       // enable hover processing
      });
      context.vegaView = view;
      if (callback) {
        callback(context, view);
      }
      setTimeout(function() {
        window.windowResize();
      }, 500);
      context.vegaEvents(view);
      return view.runAsync();
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
            item: item
          }
        }));
      }

    }

}


window.customElements.define('vega-container', VegaContainer);
export { VegaContainer }