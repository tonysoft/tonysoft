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
    static get template() {
        return html`
        <style>
            .noSelect {
                user-select: none;
            }
            .main {
                position: relative;
            }
            .isVisible: {
                display: inline-block;
            }
            .isInvisible: {
                display: none;
            }
        </style>
        <div class="main noSelect" style="display: [[connectUiShow(connectUi)]];">
            <button id="connect" style="display: [[connectButtonShow(deviceConnected)]]; cursor: pointer;" on-click="connectClick">Connect</button>
            <button id="disconnect" style="display: [[disconnectButtonShow(deviceConnected)]]; cursor: pointer;" on-click="disconnectClick">Disconnect</button>
        </div>
        `;
    }
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
        disconnect: {
            type: Boolean,
            observer: "_disconnect"
        },
        connectUi: {
            type: Boolean
        },
        deviceConnected: {
            type: Boolean
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
      this.connectUi = false;
      this.connect = false;
      this.disconnect = false;
      this.isReady = false;
      this.deviceConnected = false;
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

    _disconnect() {
        var context = this;
        if (context.disconnect) {
            if (context.bluetoothDevice && context.bluetoothDevice.gatt.connected) {
                context.bluetoothDevice.gatt.disconnect();
                // console.log("Disonnected!");
                // context.dispatchEvent(new CustomEvent("connected", { 
                //     detail: { "connected": false, "deviceName": context.deviceName }
                // }));
            }
            context.connect = false;
            context.disconnect = false;
        }
    }

    connectUiShow(connectUi) {
        var context = this;
        if (connectUi) {
            return "block";
        } else {
            return "none";
        }
    }

    connectButtonShow(isConnected) {
        var context = this;
        if (isConnected) {
            return "none";
        } else {
            return "block";
        }
    }

    disconnectButtonShow(isConnected) {
        var context = this;
        if (isConnected) {
            return "block";
        } else {
            return "none";
        }
    }

    connectClick(e) {
        var context = this;
        e.stopPropagation();
        context.disconnect = false;
        context.connect = true;
    }

    disconnectClick(e) {
        var context = this;
        e.stopPropagation();
        context.connect = false;
        context.disconnect = true;
    }

    requestDevice() {
        var context = this;
        context.connect = false;
        if (context.bluetoothDevice) {
            context.bluetoothDevice = undefined;
            // return context.connectDeviceAndCacheCharacteristics();
        }
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
                console.log("Connected!");
                context.deviceConnected = true;
                context.dispatchEvent(new CustomEvent("connected", { 
                    detail: { "connected": context.deviceConnected, "deviceName": context.deviceName }
                }));
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
        return context.bluetoothDevice.gatt.connect()
        .catch(error => {
            console.log('Error Connect! ' + error);
        });
}

    onBluetoothConnectDisconnected(e) {
        var context = e.currentTarget.context;
        console.log('> Bluetooth Device disconnected');
//        reconnect();
        context.bluetoothDevice = null;
        context.deviceConnected = false;
        context.dispatchEvent(new CustomEvent("connected", { 
            detail: { "connected": context.deviceConnected, "deviceName": context.deviceName }
        }));
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