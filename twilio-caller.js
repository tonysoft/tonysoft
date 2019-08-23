import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// import 'https://media.twiliocdn.com/sdk/js/client/v1.7/twilio.min.js';


/**
 * `twilio-caller`
 * Place Twilio Voice Calls.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class TwilioCaller extends PolymerElement {
    static get properties() {
      return {
        twilioCapabilityTokenEndpoint: {
            type: String
        },
        callNumber: {
          type: String,
          observer: "_hangupCall"
        },
        hangupCall: {
          type: Boolean,
          observer: "_hangupCall"
        },
        log: {
          type: Array
        }
      }
    }

    constructor() {
      super();
      this.callNumber = "";
      this.hangupCall = false;
      this.log = [];
      this.twilioCapabilityTokenEndpoint = "https://cinereous-greyhound-5595.twil.io/capability-token";
    }

    ready() {
        var context = this;
        super.ready();
        context.getTwilioCapabilityToken();
    }
    
    getTwilioCapabilityToken() {
        var context = this;
        if (context.twilioCapabilityTokenEndpoint) {
            fetch(context.twilioCapabilityTokenEndpoint)
            .then(res => res.json())
            .then(token => context.initTwilioVoice(token))
            .catch(err => context.logError("getTwilioCapabilityToken", err));
        }
    }

    initTwilioVoice(data) {
        var context = this;
        context.logStatus("getTwilioCapabilityToken Response", data);
        context.device = new Twilio.Device(data.token, {
            // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
            // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
            codecPreferences: ['opus', 'pcmu'],
            // Use fake DTMF tones client-side. Real tones are still sent to the other end of the call,
            // but the client-side DTMF tones are fake. This prevents the local mic capturing the DTMF tone
            // a second time and sending the tone twice. This will be default in 2.0.
            fakeLocalDTMF: true,
        });
        context.logStatus("Got Twilio Device", context.device);
        context.device.on('ready', function() {
            context.twilioDeviceReady(context);
        });
    }

    twilioDeviceReady(context) {
        context.logStatus("Got Twilio Device", context.device);
    }

    logStatus(status, data) {
        var context = this;
        context.log.push("Status");
        context.log.push(status);
        if (data) {
            context.log.push(data);
        }
    }

    logError(status, data) {
        var context = this;
        context.log.push("Error");
        context.log.push(status);
        if (data) {
            context.log.push(data);
        }
    }

}

window.customElements.define('twilio-caller', TwilioCaller);
export { TwilioCaller }