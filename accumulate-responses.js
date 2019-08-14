import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


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
        },
        rejectEmpty: {
            type: Boolean
        }
      }
    }

    constructor() {
      super();
      this.responses = [];
      this.newResponse = null;
      this.getResponses = false;
      this.rejectEmpty = true;
    }

    _newResponse(newValue) {
        var context = this;
        if (newValue) {
            var numProps = 0;
            for (var propId in newValue) {
                numProps++;
            }
            if (numProps || !context.rejectEmpty) {
                if (!newValue.timestamp) {
                    var timestamp = new Date();
                    newValue.timeUTC = timestamp.toUTCString();
                    newValue.timestamp = timestamp.getTime();
                    var date = timestamp.getUTCFullYear() + "-" + pad(timestamp.getUTCMonth() + 1) + "-" + pad(timestamp.getUTCDate());
                    newValue.date = date;
                    var time = newValue.timeUTC.replace(" GMT", "");
                    newValue.time = time.substr(time.lastIndexOf(" ") + 1);
              }
                context.responses.push(newValue);
                context.dispatchResponses();
            }
        }
        function pad(n){return n<10 ? '0'+n : n}
    }

    _getResponses(newValue) {
        var context = this;
        if (newValue) {
            context.dispatchResponses();
            context.getResponses = false;
        }
    }

    dispatchResponses() {
        var context = this;
        context.dispatchEvent(new CustomEvent("responses", { 
            detail: { 
                responses: context.responses
            }
        }));
    }

}


window.customElements.define('accumulate-responses', AccumulateResponses);
export { AccumulateResponses }