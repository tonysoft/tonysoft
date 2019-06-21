/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import 'https://unpkg.com/tonysoft/@polymer/polymer/polymer-legacy.js';

import 'https://unpkg.com/tonysoft/@polymer/iron-location/iron-location.js';
import 'https://unpkg.com/tonysoft/@polymer/font-roboto/roboto.js';
import {Polymer} from 'https://unpkg.com/tonysoft/@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from 'https://unpkg.com/tonysoft/@polymer/polymer/lib/utils/html-tag.js';

/**
`url-bar` is a helper element that displays a simple read-only URL bar if
and only if the page is in an iframe. In this way we can demo elements that
deal with the URL in our iframe-based demo environments.

If the page is not in an iframe, the url-bar element is not displayed.

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--url-bar` | Mixin applied to the entire element | `{}`

@element url-bar
@demo demo/url-bar.html
*/
Polymer({
  _template: html`
    <style>
      :host {
        margin: 0px;
        padding: 15px 35px;
        border-bottom: 2px solid gray;
        height: 1.5em;
        display: none;
        overflow-x: auto;
        overflow-y: hidden;
        background-color: white;
        @apply --url-bar;
      }
      :host([in-iframe]) {
        /* This element only wants to be displayed if it's in an iframe. */
        display: block;
      }

      label {
        font-family: 'Roboto', 'Noto', sans-serif;
        -webkit-font-smoothing: antialiased;
        /* for backwards compat */
        @apply --paper-font-common-base;
        display: inline-block;
        padding-right: 25px;
      }

      span {
        font-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
        -webkit-font-smoothing: antialiased;
        /* for backwards compat */
        @apply --paper-font-common-code;
        white-space: pre;
      }

      .layout.horizontal {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      }
    </style>

    <iron-location path="{{path}}" query="{{query}}" hash="{{hash}}">
    </iron-location>
    <div class="layout horizontal">
      <label>URL</label><span>{{url}}</span>
    </div>
`,

  is: 'url-bar',

  properties: {
    url: {
      computed: '__computeUrl(path, query, hash)',
      type: String,
    },

    inIframe: {
      value: function() {
        return window.top !== window;
      },
      reflectToAttribute: true,
      type: Boolean
    },

    path: {
      type: String,
    },

    query: {
      type: String,
    },

    hash: {
      type: String,
    }
  },

  __computeUrl: function(path, query, hash) {
    var url = path;

    if (query) {
      url += '?' + query;
    }

    if (hash) {
      url += '#' + hash;
    }

    return url;
  }
})
