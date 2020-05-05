import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
/**
 * `file-upload`
 * To upload file
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FileUploadX extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        dropArea {
          border: 2px dashed #ccc;
          border-radius: 20px;
          width: 250px;
          font-family: sans-serif;
          margin: 100px auto;
          padding: 20px;
        }
        dropArea.highlight {
          border-color: purple;
        }
        p {
          margin-top: 0;
        }
        .my-form {
          margin-bottom: 10px;
        }
        #gallery {
          margin-top: 10px;
        }
        #gallery img {
            width: 100%;
        }
        .button {
          display: inline-block;
          padding: 10px;
          background: #ccc;
          cursor: pointer;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .button:hover {
          background: #ddd;
        }
        #fileElem {
          visibility: hidden
        }
        .container { position: relative; border: 1px solid #666666; border-radius: 4px;  opacity: 1.0; text-align: center; background-color: #f0f0f0;}
        .label { cursor: pointer; display: inline-block; position: absolute; top: 0px; left: 0px; background-color: #eeeeee00; }
        .fileInput { display: none; }
      </style>
      <div id="dropArea">
        <div class="container" style="width: [[width]]px; height: [[height]]px; opacity: [[buttonOpacity]];  line-height: [[height]]px; font-size: 12px;">
            <span>[[label]]</span>
            <label for="fileElem" class="label" style="width: [[width]]px; height: [[height]]px;"></label>
            <input id="fileElem" type="file" on-change="_handleFiles" class="fileInput" accept="[[accept]]" multiple>
        </div>
        <progress id="progressBar" max=100 value=0 style="display: none;" ></progress>
        <div id="gallery" style="width: [[previewWidth]]px; display: none;"></div>
      </div>
    `;
  }
  static get properties() {
    return {
        height: {
            type: Number
        },
        width: {
            type: Number
        },
        buttonOpacity: {
            type: Number
        },
        preview: {
            type: Boolean
        },
        previewWidth: {
          type: Number,
          value: 350
        },
        label: {
          type: String,
          value: 'Upload an Image'
        },
        accept: {
          type: String,
          value: '*.*'
        },
        typeOfOutput: {
            type: String,
            value: 'base64'
        }
    };
  }

  // constructor() {
  //   super();
  //   this._onInit()
  // }
  connectedCallback(){
    super.connectedCallback()
    this._onInit()
  }

  _onInit () {
    this.filesDone = 0
    this.filesToDo = 0
    this.progressBar = this.$.progressBar
    this.dropArea = this.$.dropArea
    this.gallery = this.$.gallery
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, this._preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, this._highlight, false)
    })
    
    ;['dragleave', 'drop'].forEach(eventName => {
      this.dropArea.addEventListener(eventName, this._unhighlight, false)
    })
    this.dropArea.addEventListener('drop', this._handleDrop.bind(this), false)
  }

  _selectFile() {
    this.$.fileElem.click()
    // var elem = this.$.fileElem
    // console.log(elem)
    // console.log(document.createEvent)
    // if(elem && document.createEvent) {
    //   var evt = document.createEvent("MouseEvents");
    //   evt.initEvent("click", true, false);
    //   elem.dispatchEvent(evt);
    // }
  }

  _initializeProgress(numfiles) {
    this.progressBar.value = 0
    this.filesDone = 0
    this.filesToDo = numfiles
  }

  _progressDone() {
    this.filesDone++
    this.progressBar.value = this.filesDone / this.filesToDo * 100
  }

  _preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  _highlight(e) {
    e.path[0].classList.add('highlight')
  }
  
  _unhighlight(e) {
    e.path[0].classList.remove('highlight')
  }

  _handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files[0]
    this._initializeProgress(1)
    this._uploadFile(files)
    this._previewFile(files)
  }

  _handleFiles(e) {
    var files = e.path[0].files[0]
    this._initializeProgress(1)
    this._uploadFile(files)
    this._previewFile(files)
  }

  _getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    //   console.log(reader.result)
    //   console.log(typeof reader.result)
      var obj = {
        base64: reader.result.split(',')[1],
        name: file.name,
        type: file.type
      }
      this.dispatchEvent(new CustomEvent("file-output", {detail: JSON.stringify(obj)}));
    };
    reader.onerror = error => reject(error);
  }

  _remixRefImage(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    //   console.log(reader.result)
    //   console.log(typeof reader.result)
      var base64 = reader.result.split(',')[1];
      var ref = "{ref:" + file.type + "}" + base64;
      this.dispatchEvent(new CustomEvent("file-output", {detail: ref}));
    };
    reader.onerror = error => reject(error);
  }
  
  _dataURI(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    //   console.log(reader.result)
    //   console.log(typeof reader.result)
      this.dispatchEvent(new CustomEvent("file-output", {detail: reader.result}));
    };
    reader.onerror = error => reject(error);
  }
  
  _uploadFile(file) {
    if (this.typeOfOutput == 'blob') {
      const fileAsBlob = new Blob([file], {type : file.type});
    //   console.log(fileAsBlob)
    //   console.log(typeof fileAsBlob)
      this.dispatchEvent(new CustomEvent("file-output", {detail: fileAsBlob}));
    } else if (this.typeOfOutput == 'base64') {
        this._getBase64(file);
    } else if (this.typeOfOutput == 'remixRefImage') {
        this._remixRefImage(file);
    }  if (this.typeOfOutput == 'dataURI') {
        this._dataURI(file);
    } 
    this._progressDone()
  }

  _previewFile(file) {
    if (this.preview) {
        this.gallery.innerHTML = "";
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
        let img
        if (file.type.includes('image')) {
            img = document.createElement('img')
        } else {
            img = document.createElement('iframe')
            img.width = '100%'
            img.height = '500px'
        }
        img.src = reader.result;
        this.gallery.style.display = "block";
        this.gallery.appendChild(img)
        }
    }
  }

}

window.customElements.define('file-upload-x', FileUploadX);