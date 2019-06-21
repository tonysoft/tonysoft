/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   iron-icon.js
 */

import {IronMeta} from 'https://unpkg.com/tonysoft@^1.2.6/@polymer/iron-meta/iron-meta.js';

import {Polymer} from 'https://unpkg.com/tonysoft@^1.2.6/@polymer/polymer/lib/legacy/polymer-fn.js';

import {dom} from 'https://unpkg.com/tonysoft@^1.2.6/@polymer/polymer/lib/legacy/polymer.dom.js';

import {html} from 'https://unpkg.com/tonysoft@^1.2.6/@polymer/polymer/lib/utils/html-tag.js';

import {LegacyElementMixin} from 'https://unpkg.com/tonysoft@^1.2.6/@polymer/polymer/lib/legacy/legacy-element-mixin.js';

/**
 * The `iron-icon` element displays an icon. By default an icon renders as a 24px
 * square.
 *
 * Example using src:
 *
 *     <iron-icon src="star.png"></iron-icon>
 *
 * Example setting size to 32px x 32px:
 *
 *     <iron-icon class="big" src="big_star.png"></iron-icon>
 *
 *     <style is="custom-style">
 *       .big {
 *         --iron-icon-height: 32px;
 *         --iron-icon-width: 32px;
 *       }
 *     </style>
 *
 * The iron elements include several sets of icons. To use the default set of
 * icons, import `iron-icons.js` and use the `icon` attribute to specify an icon:
 *
 *     <script type="module">
 *       import "@polymer/iron-icons/iron-icons.js";
 *     </script>
 *
 *     <iron-icon icon="menu"></iron-icon>
 *
 * To use a different built-in set of icons, import the specific
 * `iron-icons/<iconset>-icons.js`, and specify the icon as `<iconset>:<icon>`.
 * For example, to use a communication icon, you would use:
 *
 *     <script type="module">
 *       import "@polymer/iron-icons/communication-icons.js";
 *     </script>
 *
 *     <iron-icon icon="communication:email"></iron-icon>
 *
 * You can also create custom icon sets of bitmap or SVG icons.
 *
 * Example of using an icon named `cherry` from a custom iconset with the ID
 * `fruit`:
 *
 *     <iron-icon icon="fruit:cherry"></iron-icon>
 *
 * See `<iron-iconset>` and `<iron-iconset-svg>` for more information about how to
 * create a custom iconset.
 *
 * See the `iron-icons` demo to see the icons available in the various iconsets.
 *
 * ### Styling
 *
 * The following custom properties are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--iron-icon` | Mixin applied to the icon | {}
 * `--iron-icon-width` | Width of the icon | `24px`
 * `--iron-icon-height` | Height of the icon | `24px`
 * `--iron-icon-fill-color` | Fill color of the svg icon | `currentcolor`
 * `--iron-icon-stroke-color` | Stroke color of the svg icon | none
 */
interface IronIconElement extends LegacyElementMixin, HTMLElement {

  /**
   * The name of the icon to use. The name should be of the form:
   * `iconset_name:icon_name`.
   */
  icon: string|null|undefined;

  /**
   * The name of the theme to used, if one is specified by the
   * iconset.
   */
  theme: string|null|undefined;

  /**
   * If using iron-icon without an iconset, you can set the src to be
   * the URL of an individual icon image file. Note that this will take
   * precedence over a given icon attribute.
   */
  src: string|null|undefined;
  _meta: IronMeta;
  _DEFAULT_ICONSET: string;
  _iconChanged(icon: any): void;
  _srcChanged(src: any): void;
  _usesIconset(): any;
  _updateIcon(): void;
}

export {IronIconElement};

declare global {

  interface HTMLElementTagNameMap {
    "iron-icon": IronIconElement;
  }
}
