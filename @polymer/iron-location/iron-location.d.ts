/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   iron-location.js
 */

import {Polymer} from 'https://unpkg.com/tonysoft@latest/@polymer/polymer/lib/legacy/polymer-fn.js';

import {dom} from 'https://unpkg.com/tonysoft@latest/@polymer/polymer/lib/legacy/polymer.dom.js';

import {LegacyElementMixin} from 'https://unpkg.com/tonysoft@latest/@polymer/polymer/lib/legacy/legacy-element-mixin.js';

/**
 * The `iron-location` element manages binding to and from the current URL.
 *
 * iron-location is the first, and lowest level element in the Polymer team's
 * routing system. This is a beta release of iron-location as we continue work
 * on higher level elements, and as such iron-location may undergo breaking
 * changes.
 *
 * #### Properties
 *
 * When the URL is: `/search?query=583#details` iron-location's properties will be:
 *
 *   - path: `'/search'`
 *   - query: `'query=583'`
 *   - hash: `'details'`
 *
 * These bindings are bidirectional. Modifying them will in turn modify the URL.
 *
 * iron-location is only active while it is attached to the document.
 *
 * #### Links
 *
 * While iron-location is active in the document it will intercept clicks on links
 * within your site, updating the URL pushing the updated URL out through the
 * databinding system. iron-location only intercepts clicks with the intent to
 * open in the same window, so middle mouse clicks and ctrl/cmd clicks work fine.
 *
 * You can customize this behavior with the `urlSpaceRegex`.
 *
 * #### Dwell Time
 *
 * iron-location protects against accidental history spamming by only adding
 * entries to the user's history if the URL stays unchanged for `dwellTime`
 * milliseconds.
 */
interface IronLocationElement extends LegacyElementMixin, HTMLElement {

  /**
   * The pathname component of the URL.
   */
  path: string|null|undefined;

  /**
   * The query string portion of the URL.
   */
  query: string|null|undefined;

  /**
   * The hash component of the URL.
   */
  hash: string|null|undefined;

  /**
   * If the user was on a URL for less than `dwellTime` milliseconds, it
   * won't be added to the browser's history, but instead will be replaced
   * by the next entry.
   *
   * This is to prevent large numbers of entries from clogging up the user's
   * browser history. Disable by setting to a negative number.
   */
  dwellTime: number|null|undefined;

  /**
   * A regexp that defines the set of URLs that should be considered part
   * of this web app.
   *
   * Clicking on a link that matches this regex won't result in a full page
   * navigation, but will instead just update the URL state in place.
   *
   * This regexp is given everything after the origin in an absolute
   * URL. So to match just URLs that start with /search/ do:
   *     url-space-regex="^/search/"
   */
  urlSpaceRegex: string|RegExp|null;

  /**
   * A flag that specifies whether the spaces in query that would normally be
   * encoded as %20 should be encoded as +.
   *
   * Given an example text "hello world", it is encoded in query as
   * - "hello%20world" without the parameter
   * - "hello+world" with the parameter
   */
  encodeSpaceAsPlusInQuery: boolean|null|undefined;

  /**
   * urlSpaceRegex, but coerced into a regexp.
   */
  readonly _urlSpaceRegExp: RegExp|null;
  _lastChangedAt: number|null|undefined;
  _initialized: boolean|null|undefined;
  hostAttributes: object|null;
  created(): void;
  attached(): void;
  detached(): void;
  _hashChanged(): void;
  _urlChanged(): void;
  _getUrl(): any;
  _updateUrl(): void;

  /**
   * A necessary evil so that links work as expected. Does its best to
   * bail out early if possible.
   *
   * @param event .
   */
  _globalOnClick(event: MouseEvent|null): void;

  /**
   * Returns the absolute URL of the link (if any) that this click event
   * is clicking on, if we can and should override the resulting full
   * page navigation. Returns null otherwise.
   *
   * @param event .
   * @returns .
   */
  _getSameOriginLinkHref(event: MouseEvent|null): string|null;
  _makeRegExp(urlSpaceRegex: any): any;
}

export {IronLocationElement};

declare global {

  interface HTMLElementTagNameMap {
    "iron-location": IronLocationElement;
  }
}
