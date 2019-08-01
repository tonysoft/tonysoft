import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://cdn.jsdelivr.net/npm/vega@5';
import '@polymer/iron-icon/iron-icon.js';


/**
 * `accumulate-responses`
 * Accumulate an Array of JSON responses and present them upon request.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AccumulateResponses extends PolymerElement {
  
    static get properties() {
      return {
        responses: {
          type: Object
        },
        newResponse: {
          type: Object,
          observer: "_newResponse"
        },
        getResponses: {
          type: Boolean,
          observer: "_getResponses"
        }
      }
    }

    constructor() {
      super();
      this.responses = [];
      this.newResponse = null;
      this.getResponses = false;
    }

    _newResponse(newValue) {
      var context = this;
      if (newValue) {
        context.responses.push(newValue);
      }
    }

    _getResponses(newValue) {
        var context = this;
        if (newValue) {
          context.dispatchEvent(new CustomEvent("responses", { 
            detail: { 
              responses: context.responses
            }
          }));
          context.getResponses = false;
        }
    }

}


window.customElements.define('accumulate-responses', AccumulateResponses);
export { AccumulateResponses }