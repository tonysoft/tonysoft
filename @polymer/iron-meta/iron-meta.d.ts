/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   iron-meta.js
 */

import {Polymer} from 'https://unpkg.com/tonysoft@1.2.4/@polymer/polymer/lib/legacy/polymer-fn.js';

export {IronMeta};

declare class IronMeta {
  type: string;
  key: string|null|undefined;
  value: any;
  readonly list: any[];
  constructor(options?: {type?: string|null, key?: string|null, value: any});
  byKey(key: string): any;
}

import {LegacyElementMixin} from 'https://unpkg.com/tonysoft@1.2.4/@polymer/polymer/lib/legacy/legacy-element-mixin.js';

/**
 * `iron-meta` is a generic element you can use for sharing information across the
 * DOM tree. It uses [monostate pattern](http://c2.com/cgi/wiki?MonostatePattern)
 * such that any instance of iron-meta has access to the shared information. You
 * can use `iron-meta` to share whatever you want (or create an extension [like
 * x-meta] for enhancements).
 *
 * The `iron-meta` instances containing your actual data can be loaded in an
 * import, or constructed in any way you see fit. The only requirement is that you
 * create them before you try to access them.
 *
 * Examples:
 *
 * If I create an instance like this:
 *
 *     <iron-meta key="info" value="foo/bar"></iron-meta>
 *
 * Note that value="foo/bar" is the metadata I've defined. I could define more
 * attributes or use child nodes to define additional metadata.
 *
 * Now I can access that element (and it's metadata) from any iron-meta instance
 * via the byKey method, e.g.
 *
 *     meta.byKey('info');
 *
 * Pure imperative form would be like:
 *
 *     document.createElement('iron-meta').byKey('info');
 *
 * Or, in a Polymer element, you can include a meta in your template:
 *
 *     <iron-meta id="meta"></iron-meta>
 *     ...
 *     this.$.meta.byKey('info');
 */
interface IronMetaElement extends LegacyElementMixin, HTMLElement {

  /**
   * The type of meta-data.  All meta-data of the same type is stored
   * together.
   */
  type: string;

  /**
   * The key used to store `value` under the `type` namespace.
   */
  key: string|null;

  /**
   * The meta-data to store or retrieve.
   */
  value: any;

  /**
   * If true, `value` is set to the iron-meta instance itself.
   */
  self: boolean|null|undefined;
  hostAttributes: object|null;
  readonly list: any;
  _selfChanged(self: any): void;

  /**
   * Retrieves meta data value by key.
   *
   * @param key The key of the meta-data to be returned.
   */
  byKey(key: string): any;
}

export {IronMetaElement};

declare global {

  interface HTMLElementTagNameMap {
    "iron-meta": IronMetaElement;
  }
}
