import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'https://unpkg.com/tonysoft@1.51.97/twilio.js';


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
        capabilityTokenEndpoint: {
            type: String,
            observer: "_capabilityTokenEndpoint"
        },
        callNumber: {
          type: String,
          observer: "_callNumber"
        },
        hangupCall: {
          type: Boolean,
          observer: "_hangupCall"
        },
        log: {
          type: Array
        },
        isReady: {
          type: Boolean
        }
      }
    }

    constructor() {
      super();
      this.callNumber = "";
      this.hangupCall = false;
      this.log = [];
      this.capabilityTokenEndpoint = "";
      this.isReady = false;
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.getTwilioCapabilityToken();
    }

    _callNumber() {
        var context = this;
        if (context.callNumber && context.device) {
            var params = {
                To: context.callNumber
            };
          
            context.logStatus('Calling ' + params.To + '...');
            context.device.connect(params);
        }
    }

    _capabilityTokenEndpoint() {
        var context = this;
        if (context.isReady && context.capabilityTokenEndpoint && !context.device) {
            context.getTwilioCapabilityToken();
        }
    }

    _hangupCall() {
        var context = this;
        if (context.hangupCall) {
            context.logStatus('Hanging up ' + context.callNumber + '...');
            context.device.disconnectAll();
        }
    }
    
    getTwilioCapabilityToken() {
        var context = this;
        if (context.capabilityTokenEndpoint) {
            fetch(context.capabilityTokenEndpoint)
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
        context.device.on('connect', function (conn) {
            context.logStatus('Successfully established call...');
            context.dispatchEvent(new CustomEvent("callConnected", { 
                detail: { "connected": true, "callNumber": context.callNumber }
            }));
        });
        context.device.on('disconnect', function (conn) {
            context.logStatus('Call disconnected...');
            context.dispatchEvent(new CustomEvent("callConnected", { 
                detail: { "connected": false, "callNumber": context.callNumber }
            }));
            context.dispatchEvent(new CustomEvent("callDisonnected", { 
                detail: { "connected": false, "callNumber": context.callNumber }
            }));
            context.callNumber = "";
            context.hangupCall = false;
        });
        context.device.on('error', function (error) {
            context.logError('Twilio.Device Error: ' + error.message);
            if (error.code === 31205) {
                setTimeout(function() {
                    context.getTwilioCapabilityToken();
                }, 100)
                return;
            }
            context.dispatchEvent(new CustomEvent("deviceError", { 
                detail: { "deviceError": error }
            }));
        });
        device.on('incoming', function (conn) {
            context.logStatus('Incoming connection from ' + conn.parameters.From);
            context.dispatchEvent(new CustomEvent("incomingCall", { 
                detail: { "callNumber": conn.parameters.From }
            }));
            if (true) {
              conn.reject();
            } else {
              // accept the incoming connection and start two-way audio
              conn.accept();
            }
        });
    
    }

    twilioDeviceReady(context) {
        context.logStatus("Twilio Device Ready", context.device);
        context.dispatchEvent(new CustomEvent("deviceReady", { 
            detail: {}
        }));
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