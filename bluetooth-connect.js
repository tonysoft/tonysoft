import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


/**
 * `bluetooth-connect`
 * Connect to Bluetooth Device, Service, and Characteristics and Send and Receive Data.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BluetoothConnect extends PolymerElement {
    static get properties() {
      return {
        deviceName: {
            type: String
        },
        serviceId: {
            type: String
        },
        characteristics: {
            type: Array
        },
        config: {
            type: Object,
            observer: "_config"
        },
        connect: {
            type: Boolean,
            observer: "_connect"
        },
        isReady: {
            type: Boolean
        }
      }
    }

    constructor() {
      super();
      this.deviceName = "";
      this.serviceId = "";
      this.characteristics = null;
      this.config = null;
      this.connect = false;
      this.isReady = false;
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
    }

    _connect() {
        var context = this;
        if (context.connect) {
            if (context.isReady === false) {
                var isReadyInterval = setInterval(function() {
                    if (context.isReady) {
                        clearInterval(isReadyInterval);
                        context.requestDevice();
                    }
                }, 100)
            } else {
                context.requestDevice();
            }
        }
    }

    requestDevice() {
        var context = this;
        console.log('Requesting Bluetooth Device(s)...');
        var acceptAllDevices = context.deviceName ? undefined : true;
        var filters = context.deviceName ? [{ name: [context.deviceName] }] : undefined;
        return navigator.bluetooth.requestDevice({
            acceptAllDevices: acceptAllDevices,
            filters: filters})
        .then(device => {
            context.bluetoothDevice = device;
            context.bluetoothDevice.context = context;
            context.bluetoothDevice.addEventListener('gattserverdisconnected', context.onBluetoothConnectDisconnected);
            context.connectDeviceAndCacheCharacteristics().then(response => {
                console.log("Connected!")
            })
            .catch(error => {
                console.log('Error connect! ' + error);
            });
        })
        .catch(error => {
            console.log('Error requestDevice! ' + error);
        });
    }

    connectDeviceAndCacheCharacteristics() {
        var context = this;
        if (context.bluetoothDevice.gatt.connected) {
          return Promise.resolve();;
        }
      
        console.log('Connecting to GATT Server...');
        return context.bluetoothDevice.gatt.connect();
    }

    onBluetoothConnectDisconnected(e) {
        var context = e.currentTarget.context;
        console.log('> Bluetooth Device disconnected');
        reconnect();
        function reconnect() {
            context.connectDeviceAndCacheCharacteristics().then(response => {
                  console.log("Reconnected!")
              })
              .catch(error => {
                  console.log('Error reconnect! ' + error);
              });
        }
    }
}
window.onBluetoothConnectDisconnected = function(e) {
    var context = e.currentTarget.context;
    console.log('> Bluetooth Device disconnected');
    // reconnect();
    // function reconnect() {
    //       connectDeviceAndCacheCharacteristics().then(response => {
    //           reconnected = true;
    //           log("Reconnected!")
    //       })
    //       .catch(error => {
    //           log('Error reconnect! ' + error);
    //       });
    // }
}

window.customElements.define('bluetooth-connect', BluetoothConnect);
export { BluetoothConnect }