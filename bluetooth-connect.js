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
        getCharacteristics: {
            type: Array
        },
        putCharacteristics: {
            type: Array
        },
        config: {
            type: Object,
            observer: "_config"
        },
        configUrl: {
            type: String,
            observer: "_configUrl"
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
        },
        writeValue: {
            type: String,
            observer: "_writeValue"
        }
      }
    }

    constructor() {
      super();
      this.deviceName = "";
      this.serviceId = "";
      this.getCharacteristics = [];
      this.putCharacteristics = [];
      this.config = null;
      this.connectUi = false;
      this.connect = false;
      this.disconnect = false;
      this.isReady = false;
      this.deviceConnected = false;
      this.configUrl = "";
      this.writeValue = "";
    }

    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
    }

    _configUrl(newValue) {
        var context = this;
        if (newValue) {
            fetch(newValue)
            .then(res => res.json())
            .then(spec => context.setConfig(spec))
            .catch(err => console.error(err));
         }
    }

    setConfig(config) {
        var context = this;
        context.config = config;
    }

    _config(config) {
        var context = this;
        if (config) {
            if (config.deviceName) {
                context.deviceName = config.deviceName;
            }
            if (config.serviceId) {
                context.serviceId = config.serviceId;
            }
            var getIndex = 0;
            var putIndex = 0;
            for (var name in config.characteristics) {
                var characteristic = config.characteristics[name];
                if (characteristic.get) {
                    characteristic.index = getIndex;
                    characteristic.name = name;
                    getIndex++;
                    context.getCharacteristics.push(characteristic);
                }
                if (characteristic.put) {
                    characteristic.index = putIndex;
                    characteristic.name = name;
                    putIndex++;
                    context.putCharacteristics.push(characteristic);
                }
            };
            context.dispatchEvent(new CustomEvent("configParsed", { 
                detail: config
            }));
        }
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
            // return context.connectDevice();
        }
        console.log('Requesting Bluetooth Device(s)...');
        var acceptAllDevices = context.deviceName ? undefined : true;
        var filters = context.deviceName ? [{ namePrefix: [context.deviceName] }] : undefined;
        var optionalServices = context.serviceId ? [context.serviceId] : undefined;
        return navigator.bluetooth.requestDevice({
            acceptAllDevices: acceptAllDevices,
            filters: filters,
            optionalServices: optionalServices})
        .then(device => {
            context.bluetoothDevice = device;
            context.bluetoothDevice.context = context;
            context.bluetoothDevice.addEventListener('gattserverdisconnected', context.onBluetoothConnectDisconnected);
            context.connectDevice();
        })
        .catch(error => {
            context.deviceConnected = false;
            context.dispatchEvent(new CustomEvent("connected", { 
                detail: { "connected": context.deviceConnected, "deviceName": context.deviceName, "error": error }
            }));
            console.log('Error requestDevice! ' + error);
        });
    }

    connectDevice() {
        var context = this;
        if (context.bluetoothDevice.gatt.connected) {
          return Promise.resolve();;
        }
      
        console.log('Connecting to GATT Server...');
        return context.bluetoothDevice.gatt.connect().then(server => {
            console.log("Connected!");
            context.deviceConnected = true;
            context.dispatchEvent(new CustomEvent("connected", { 
                detail: { "connected": context.deviceConnected, "deviceName": context.deviceName }
            }));
            context.retrieveService(server);
        })
        .catch(error => {
            context.deviceConnected = false;
            context.dispatchEvent(new CustomEvent("connected", { 
                detail: { "connected": context.deviceConnected, "deviceName": context.deviceName, "error": error }
            }));
            console.log('Error Connect! ' + error);
        });
    }

    retrieveService(server) {
        var context = this;
        if (context.serviceId) {
            server.getPrimaryService(context.serviceId)
            .then(service => {
                console.log("Service Retrieved!");
                var context = service.device.context;
                context.setupCharacteristics(service);
            })
            .catch(error => {
                console.log('Service Retrieval Error! ' + error);
            });
        }
    }

    setupCharacteristics(service) {
        var context = this;
        if (context.getCharacteristics.length) {
            context.getCharacteristics.forEach(function(rawCharacteristic) {
                service.getCharacteristic(rawCharacteristic.id).then(characteristic => { context.setupGetCharacteristic(rawCharacteristic, characteristic) });
            })
        }
        if (context.putCharacteristics.length) {
            context.putCharacteristics.forEach(function(rawCharacteristic) {
                service.getCharacteristic(rawCharacteristic.id).then(characteristic => { context.setupPutCharacteristic(rawCharacteristic, characteristic) });
            })
        }
    }

    setupGetCharacteristic(rawCharacteristic, characteristic) {
        var context = this;
        rawCharacteristic.characteristic = characteristic;
        characteristic.properties.name = rawCharacteristic.name;
        characteristic.addEventListener('characteristicvaluechanged', context.handleCharacteristicChanged);
        if (rawCharacteristic.notifications) {
            characteristic.startNotifications()
            .then(_ => {
                console.log('> Notifications started');
            })
            .catch(error => {
                console.log('Error startNotifications! ' + error);
            });
        }
        return characteristic.readValue();
    }
    
    setupPutCharacteristic(rawCharacteristic, characteristic) {
        rawCharacteristic.characteristic = characteristic;
    }

    _writeValue(characteristicValue) {
        if (!characteristicValue) {
            return;
        }
        var context = this;
        var segments = characteristicValue.split(":");
        context.writeValue = "";
        if (segments.length != 2) {
            return;
        }
        if (!context.config) {
            return;
        }
        if (!context.config.characteristics) {
            return;
        }
        var rawCharacteristic = context.config.characteristics[segments[0]];
        if (!rawCharacteristic) {
            return;
        }
        var characteristic = rawCharacteristic.characteristic
        var data = context.requestData(segments[1]);
        return characteristic.writeValue(data)
          .catch(err => console.log('Error writing Characteristic Value! ', err))
          .then(() => {
            console.log("Characteristic Value Written...");
        });
    }

    requestData(charList) {
        var uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        let data = new Uint8Array(uintArray);
        return data;
    }
    
    handleCharacteristicChanged(event) {
        var context = event.srcElement.service.device.context;
        var characteristic = event.srcElement;
        var value = event.target.value;
        var dataArray = [];
        for (var i = 0; i < value.byteLength; i++) {
            dataArray.push(value.getUint8(i));
        }
        var dataString = context.uintArrayAsString(dataArray);
        console.log('> Value is ' + dataString);
        context.dispatchEvent(new CustomEvent("characteristicChanged", { 
            detail: { "characteristic": characteristic.properties.name, "data": dataString }
        }));
    } 
    

    dataAsUint8Array(charList) {
        var context = this;
        var uintArray = [];
        for (var i = 0; i < charList.length; i++) {
            uintArray.push(charList[i].charCodeAt(0));
        }
        let data = new Uint8Array(uintArray);
        return data;
    }
    
    uintArrayAsString(uintArray) {
        var context = this;
        var dataString = String.fromCharCode.apply(null, uintArray);
        return dataString;
    }
    
    
    onBluetoothConnectDisconnected(e) {
        var context = e.currentTarget.context;
        console.log('> Bluetooth Device disconnected');
        context.bluetoothDevice = null;
        context.deviceConnected = false;
        context.dispatchEvent(new CustomEvent("connected", { 
            detail: { "connected": context.deviceConnected, "deviceName": context.deviceName }
        }));
//        reconnect();  // Auto reconnect
        function reconnect() {
            context.connectDevice().then(response => {
                  console.log("Reconnected!")
              })
              .catch(error => {
                  console.log('Error reconnect! ' + error);
              });
        }
    }
}

window.customElements.define('bluetooth-connect', BluetoothConnect);
export { BluetoothConnect }