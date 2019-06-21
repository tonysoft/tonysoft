import {html, PolymerElement} from 'https://unpkg.com/tonysoft@^1.2.6/@polymer/polymer/polymer-element.js';

/**
 * `workout-timer`
 * An Analog Clock which tracks workout progress
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WorkoutReps extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          height: 100%;
          width: 100%;
          --progress-heading-out: #efb3b0ff;
          --progress-heading-in: #efe2adff;
          --progress-finishing: #bbedb4ff;
          --progress-percentage: 100%;
          --font-size: 42px;
          --line-height: 50px;
        }
        .relatively {
          position: relative;
        }
        .absolutely {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
        }
        .centered {
          text-align: center;
        }
        .progressBackground {
          border: 4px solid black;
          border-color: #777777 #eeeeee #eeeeee #777777;
          background-color: white;
          overflow: hidden;
          z-index: 25;
          top: 0%;
          left: 0%;
          width: 100%;
          height: 100%;
        }
        .progressOut {
          background-color: var(--progress-heading-out);
        }
        .progressIn {
          background-color: var(--progress-heading-in);
        }
        .progressFinishing {
          background-color: var(--progress-finishing);
        }
        .progress {
          width: var(--progress-percentage);
        }
        .action {
          cursor: pointer;
        }
        .progressText {
          text-align: center;
          font-size: var(--font-size);
          line-height: var(--line-height);
          padding: 0px;
        }
        .noSelect {
          user-select: none;
        }
      </style>
      <div class="relatively action noSelect" style="height: 100%; width:100%;" on-click="eat" on-contextmenu="cancelDefault"  on-mousedown="eat" on-mouseup="bumpRepsInternal">
        <div class="absolutely">
          <div class="absolutely centered progressBackground" title="Status">
            <div class$="absolutely progress [[progressDisplay(progressPercentage)]]" title="Progress"></div>
            <div class="absolutely progressText">[[repetitionCount]]</div>
          </div>
        </div>
      </div>
    `;
  }
  static get properties() {
    return {
      width: {
        type: String
      },
      height: {
        type: String
      },
      repetitionTarget: {
        type: Number,
        observer: '_repetitionTargetChanged'
      },
      scale: {
        type: Number,
        observer: '_scaleChanged'
      },
      repetitionCount: {
        type: Number,
        notify: true,
        reflectToAttribute: true,
        observer: '_repetitionCountChanged'
      },
      progressPercentage: {
        type: Number
      },
      displayPercentage: {
        type: Number,
        observer: '_displayPercentageChanged'
      },
    };
  }
  constructor() {
    super();
    this.reset();
  }
  reset() {
    this.progressPercentage = 0.0;
    this.repetitionTarget = this.repetitionTarget || 100;
    this.repetitionCount = 0;
    this.dispatchEvent(new CustomEvent('reps', {detail: { action: "autoReset" }}));
  }
  bumpRepsInternal(e) {
    e.stopPropagation();
    var count = 1;
    if (e.button === 2) {
      count *= -1;
    }
    this.bumpReps(count);
  }
  bumpReps(count) {
    var context = this;
    if (!count) {
      count = 1;
    }
    context.repetitionCount += count;
    if (context.repetitionCount < 0) {
      context.repetitionCount = 0;
    }
    context.dispatchEvent(new CustomEvent('reps', {detail: { action: "currentReps", repetitionTarget: context.repetitionTarget, repetitionCount: context.repetitionCount}}));
    return { "repetitionTarget": context.repetitionTarget, "repetitionCount": context.repetitionCount };
  }
  setTargetReps(count) {
    if (!count) {
      count = 100;
    }
    this.repetitionTarget = count;
    this._repetitionCountChanged(this.repetitionCount);
  }
  _repetitionTargetChanged(newValue, oldValue) {
    var context = this;
    context.dispatchEvent(new CustomEvent('reps', {detail: { action: "targetReps", repetitionTarget: newValue}}));
  }
  progressDisplay(pct) {
    if (pct <= 50) {
      return "progressOut";
    } else {
      if (pct <= 85) {
        return "progressIn";
      } else {
        return "progressFinishing"
      }
    }
  }
  _displayPercentageChanged(newValue, oldValue) {
    this.updateStyles({'--progress-percentage': newValue + "%"});
  }
  _repetitionCountChanged(newValue, oldValue) {
    if (newValue > this.repetitionTarget) {
      this.reset();
      return;
    }
    this.progressPercentage = (this.repetitionCount / this.repetitionTarget) * 100;
    if (this.progressPercentage <= 50) {
      this.displayPercentage = 100 - this.progressPercentage
    } else {
      this.displayPercentage = this.progressPercentage;
    }
  }

  eat(event) {
    event.stopPropagation();
  }

  cancelDefault(event) {
    event.preventDefault();
    return false;
  }

  _scaleChanged(newValue, oldValue) {
    var fontSize = 42 * newValue;
    var lineHeight = fontSize * 50 / 42;
    this.updateStyles({'--font-size': fontSize + "px"});
    this.updateStyles({'--line-height': lineHeight + "px"});
  }
}

window.customElements.define('workout-reps', WorkoutReps);
