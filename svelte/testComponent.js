/* Inner.svelte generated by Svelte v3.12.1 */
import {
	SvelteElement,
	append,
	attr,
	binding_callbacks,
	detach,
	element,
	flush,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_style,
	space
} from "./svelte/internal.js";
import { createEventDispatcher, onMount } from "./svelte/svelte.js";
import "https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.js"

function create_fragment(ctx) {
	var link, t0, div1, div0, t1, button0, t3, button1, t5, button2, dispose;

	return {
		c() {
			link = element("link");
			t0 = space();
			div1 = element("div");
			div0 = element("div");
			t1 = space();
			button0 = element("button");
			button0.textContent = "Get";
			t3 = space();
			button1 = element("button");
			button1.textContent = "Tree";
			t5 = space();
			button2 = element("button");
			button2.textContent = "Text";
			this.c = noop;
			attr(link, "href", "https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.css");
			attr(link, "rel", "stylesheet");
			attr(link, "type", "text/css");
			attr(div0, "class", "editor");
			attr(button0, "class", "getJSON buttonActive");
			set_style(button0, "position", "absolute");
			set_style(button0, "bottom", "4px");
			set_style(button0, "right", "23px");
			attr(button1, "class", "treeMode buttonActive buttonInactive");
			attr(button2, "class", "textMode buttonActive");
			attr(div1, "class", "wrapper");

			dispose = [
				listen(button0, "click", ctx.getJSON),
				listen(button1, "click", ctx.treeMode),
				listen(button2, "click", ctx.textMode)
			];
		},

		m(target, anchor) {
			insert(target, link, anchor);
			insert(target, t0, anchor);
			insert(target, div1, anchor);
			append(div1, div0);
			ctx.div0_binding(div0);
			append(div1, t1);
			append(div1, button0);
			append(div1, t3);
			append(div1, button1);
			ctx.button1_binding(button1);
			append(div1, t5);
			append(div1, button2);
			ctx.button2_binding(button2);
			ctx.div1_binding(div1);
		},

		p: noop,
		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(link);
				detach(t0);
				detach(div1);
			}

			ctx.div0_binding(null);
			ctx.button1_binding(null);
			ctx.button2_binding(null);
			ctx.div1_binding(null);
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	

    let options;
	let container;
	let wrapper;
	let buttonTreeMode;
	let buttonTextMode;

	let { width = null, height = null, editor, json = {}, getjson = false, mode = 'tree' } = $$props;
    

    function getJSON() {
        if (editor) {
            editorEvent("json", editor.get());
        }
    }
 
    function treeMode() {
        $$invalidate('mode', mode = "tree");
    }
 
    function textMode() {
        $$invalidate('mode', mode = "text");
    }

	const dispatch = createEventDispatcher();
	onMount(() => {
        setTimeout(function() {
            createEditor();
        });

		return () => {
			// map.remove();
		};
	});
	function editorEvent(eventName, payload) {
        dispatch(eventName, payload);
	}

    function createEditor() {
        options = { 
            mode: mode,
            onEvent: function(node, event) {
                if (event.type === 'click') {
                    editorEvent("node", node);
                    if (node.value) {
                        editorEvent("nodeValue", node.value);
                    }
                }
            }
        };
        if (width) {
            var widthStyle = width;
            if (!isNaN(widthStyle)) {
                widthStyle += "px";
            }
            $$invalidate('wrapper', wrapper.style.width = widthStyle, wrapper);
        }
        if (height) {
            var heightStyle = height;
            if (!isNaN(heightStyle)) {
                heightStyle += "px";
            }
            $$invalidate('wrapper', wrapper.style.height = heightStyle, wrapper);
        }
        newEditor();
    }

    function newEditor() {
        $$invalidate('container', container.innerHTML = "", container);
        $$invalidate('editor', editor = new JSONEditor(container, options));
        setJSON();
    }

    function setJSON() {
        if (json.split) {
            $$invalidate('json', json = JSON.parse(json));
        }
        editor.set(json);
    }

	function div0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('container', container = $$value);
		});
	}

	function button1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('buttonTreeMode', buttonTreeMode = $$value);
		});
	}

	function button2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('buttonTextMode', buttonTextMode = $$value);
		});
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('wrapper', wrapper = $$value);
		});
	}

	$$self.$set = $$props => {
		if ('width' in $$props) $$invalidate('width', width = $$props.width);
		if ('height' in $$props) $$invalidate('height', height = $$props.height);
		if ('editor' in $$props) $$invalidate('editor', editor = $$props.editor);
		if ('json' in $$props) $$invalidate('json', json = $$props.json);
		if ('getjson' in $$props) $$invalidate('getjson', getjson = $$props.getjson);
		if ('mode' in $$props) $$invalidate('mode', mode = $$props.mode);
	};

	$$self.$$.update = ($$dirty = { getjson: 1, json: 1, editor: 1, mode: 1, buttonTreeMode: 1, buttonTextMode: 1 }) => {
		if ($$dirty.getjson) { if (getjson && (getjson !== "false")) {
                getJSON();
        	} }
		if ($$dirty.json || $$dirty.editor) { if (json && editor) {
                setJSON();
        	} }
		if ($$dirty.mode || $$dirty.editor || $$dirty.buttonTreeMode || $$dirty.buttonTextMode) { if (mode && editor) {
                options.mode = mode;
                newEditor();
                if (mode === "tree") {
                    buttonTreeMode.classList.add("buttonInactive");
                    buttonTextMode.classList.remove("buttonInactive");
                } else {
                    buttonTreeMode.classList.remove("buttonInactive");
                    buttonTextMode.classList.add("buttonInactive");
                }
        	} }
	};

	return {
		container,
		wrapper,
		buttonTreeMode,
		buttonTextMode,
		width,
		height,
		editor,
		json,
		getjson,
		mode,
		getJSON,
		treeMode,
		textMode,
		div0_binding,
		button1_binding,
		button2_binding,
		div1_binding
	};
}

class Inner extends SvelteElement {
	constructor(options) {
		super();

		this.shadowRoot.innerHTML = `<style>.wrapper{position:relative;width:100%;height:100%}.editor{width:100%;height:100%;font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica;font-weight:300;border:1px solid #444444}.buttonActive{opacity:1.0;pointer-events:all;cursor:pointer}.buttonInactive{opacity:0.4;pointer-events:none;cursor:default}.getJSON{position:absolute;bottom:4px;right:83px}.treeMode{position:absolute;bottom:4px;right:83px}.textMode{position:absolute;bottom:4px;right:143px}</style>`;

		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, ["width", "height", "editor", "json", "getjson", "mode", "getJSON"]);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["width","height","editor","json","getjson","mode","getJSON"];
	}

	get width() {
		return this.$$.ctx.width;
	}

	set width(width) {
		this.$set({ width });
		flush();
	}

	get height() {
		return this.$$.ctx.height;
	}

	set height(height) {
		this.$set({ height });
		flush();
	}

	get editor() {
		return this.$$.ctx.editor;
	}

	set editor(editor) {
		this.$set({ editor });
		flush();
	}

	get json() {
		return this.$$.ctx.json;
	}

	set json(json) {
		this.$set({ json });
		flush();
	}

	get getjson() {
		return this.$$.ctx.getjson;
	}

	set getjson(getjson) {
		this.$set({ getjson });
		flush();
	}

	get mode() {
		return this.$$.ctx.mode;
	}

	set mode(mode) {
		this.$set({ mode });
		flush();
	}

	get getJSON() {
		return this.$$.ctx.getJSON;
	}
}

export default Inner;
window.customElements.define('json-svelte', Inner);