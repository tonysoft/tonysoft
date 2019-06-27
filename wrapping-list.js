import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `wrapping-list`
 * A wrapping-list created from an array of items compatible with a Vega Tree.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class WrappingList extends PolymerElement {
    static get template() {
      return html`
        <style>
          :host {
          }
          .main {
          }
          .flexList { 
            display: flex; 
            flex-direction: row; 
            flex-wrap: wrap; 
            justify-content: space-evenly;
            align-items: center;
          }
        </style>
        <div class="main">
          <slot name="list" class="flexList"></slot>
        </div>
      `;
    }

    static get properties() {
      return {
        id: {
          type: String
        },
        category: {
          type: String
        },
        sort: {
          type: String
        },
        display: {
          type: String
        },
        itemId: {
          type: String
        },
        renderCallback: {
          type: Object
        },
        itemTemplate: {
          type: String
        },
        dataUrl: {
          type: String,
          observer: '_dataUrlChanged'
        },
        data: {
          type: Object,
          observer: '_dataChanged'
        },
        dataMap: {
          type: Object
        },
        dataChanged: {
          type: String,
          observer: '_dataChanged'
        }
      }
    }

    constructor() {
      super();
      this.renderCallback = null;
      this.data = null;
      this.dataMap = null;
      this.dataUrl = null;
    }

    ready() {
      var context = this;
      super.ready();
      var list = this.querySelector("div[slot='list']");
      context.itemTemplate = list.innerHTML;
      list.innerHTML = "";
      context.setEvents(list);
    }

    _dataUrlChanged(newValue) {
      if (!newValue) {
        return;
      }
      var context = this;
      fetch(newValue)
        .then(res => res.json())
        .then(data => context.data = data)
        .catch(err => console.error(err));
    }

    _dataChanged(newValue) {
      if (!newValue) {
        return;
      }
      var context = this;
      context.dataMap = {};
      var isHierarchy = false;
      if (context.sort) {
        context.data.forEach(function(item) {
          if (item.id) {
            item.sortField = context.sort;
          }
          isHierarchy = isHierarchy || (item.parent);
        })
        context._sortData();
      }
      context.data.forEach(function(item) {
        if (item.id) {
          context.dataMap[item.id] = item;
        }
      })
      if (context.itemTemplate) {
        var markup = ""; //"<div class='flexList'>"
        context.data.forEach(function(item) {
          var itemMarkup = context.itemTemplate;
          if (context.itemId) {
            var field = context.itemId;
            var substitution = "${" + field + "}";
            while (itemMarkup.indexOf(substitution) >= 0) {
              itemMarkup = itemMarkup.replace(substitution, item[field]);
            }
          }
          if (context.display) {
            var field = context.display;
            var substitution = "${" + field + "}";
            while (itemMarkup.indexOf(substitution) >= 0) {
              itemMarkup = itemMarkup.replace(substitution, item[field]);
            }
          }
          if (!item.parent && isHierarchy) {
            itemMarkup = itemMarkup.replace('class="', 'class="rootWrappingListItem ');
          }
          markup += itemMarkup;
        })
        // markup += "</div>"
        var list = this.querySelector("div[slot='list']");
        list.innerHTML = markup;
      }
    }

    _sortData(sortField) {
      var context = this;
      var data = context.data;
      if (data) {
        data.sort(context._sortFunction);
      }
    }

    _sortFunction(a, b) {
      var sortField = a.sortField;
      if ( a[sortField] < b[sortField] ){
        return -1;
      }
      if ( a[sortField] > b[sortField] ){
        return 1;
      }
      return 0;
    }

    setEvents(list) {
      var context = this;
      list.addEventListener('mouseover', function(event) {
        dispatchEvent(event, "mouseout");
      })
      list.addEventListener('mouseout', function(event) {
        dispatchEvent(event, "mouseover");
      })
      list.addEventListener('click', function(event) {
        dispatchEvent(event, "click");
      })

      function dispatchEvent(event, interaction) {
        var itemElement = event.toElement;
        if (itemElement) {
          var item = itemElement.getAttribute("item");
          if (item && (interaction !== "mouseout")) {
            event.stopPropagation();
            setTimeout(function() {
              context.dispatchEvent(new CustomEvent('interaction', { 
                detail: { 
                  id: item,
                  category: context.category,
                  interaction: interaction,
                  rawEvent: event,
                  container: context,
                  item: context.dataMap[item]
                }
              }));
            }, 100)
          }
          else {
            event.stopPropagation();
            context.dispatchEvent(new CustomEvent('interaction', { 
              detail: { 
                id: "",
                category: "",
                interaction: interaction,
                rawEvent: event,
                container: context,
                item: {}
              }
            }));
          }
        }
      }

    }

}


window.customElements.define('wrapping-list', WrappingList);
