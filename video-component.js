import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';


/**
 * `video-component`
 * Wrapper Component around html5 video tag.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class VideoComponent extends PolymerElement {
    static get template() {
        return html`
          <style>
            .noSelect {
                user-select: none;
            }
            .main {
                border-radius: 5px;
                border: 1px solid black;
                overflow: hidden;
            }
            .theVideo {
                width:100%;
                height:100%; 
                outline: none;
            }
          </style>
          <div class="main noSelect"style="width: [[width]]px; height: [[height]]px;">
            <video src="[[src]]" controls class="theVideo"></video>
          </div>
        `;
      }
  
    static get properties() {
      return {
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        src: {
            type: String
        }
      }
    }

    constructor() {
      super();
      this.width = 320;
      this.height = 170;
      this.src = "";
    }


}


window.customElements.define('video-component', VideoComponent);
export { VideoComponent }