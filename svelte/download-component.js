/* DownloadComponent.svelte generated by Svelte v3.12.1 */
import {
	SvelteElement,
	flush,
	init,
	insert,
	noop,
	safe_not_equal
} from "./svelte/internal.js";
import { createEventDispatcher, onMount } from "./svelte/svelte.js";

function create_fragment(ctx) {
	return {
		c() {
			this.c = noop;
		},

		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

function toBlob(content, contentType) {
    // Code taken from https://github.com/ebidel/filer.js
    var rawLength = content.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = content.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

function instance($$self, $$props, $$invalidate) {
	let { filename = "test.json", json, text } = $$props;

    function downloadJSON() {
        var content = "{}";
        if (!json.length) {
            content = JSON.stringify(json);
        } else {
            content = json;
        }
        if (content !== "{}") {
            download(content, "application/json");
            $$invalidate('json', json = {});
        }
    }
 
    function downloadText() {
        if (text !== "") {
            var content = text;
            download(content, "text/plain");
            $$invalidate('text', text = "");
        }
	}

	const dispatch = createEventDispatcher();

    function download(content, contentType) {
        var blob = toBlob(content, contentType);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    }

	$$self.$set = $$props => {
		if ('filename' in $$props) $$invalidate('filename', filename = $$props.filename);
		if ('json' in $$props) $$invalidate('json', json = $$props.json);
		if ('text' in $$props) $$invalidate('text', text = $$props.text);
	};

	return {
		filename,
		json,
		text,
		downloadJSON,
		downloadText
	};
}

class DownloadComponent extends SvelteElement {
	constructor(options) {
		super();

		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, ["filename", "json", "text", "downloadJSON", "downloadText"]);

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
		return ["filename","json","text","downloadJSON","downloadText"];
	}

	get filename() {
		return this.$$.ctx.filename;
	}

	set filename(filename) {
		this.$set({ filename });
		flush();
	}

	get json() {
		return this.$$.ctx.json;
	}

	set json(json) {
		this.$set({ json });
		flush();
	}

	get text() {
		return this.$$.ctx.text;
	}

	set text(text) {
		this.$set({ text });
		flush();
	}

	get downloadJSON() {
		return this.$$.ctx.downloadJSON;
	}

	get downloadText() {
		return this.$$.ctx.downloadText;
	}
}

export default DownloadComponent;
window.customElements.define('download-component', DownloadComponent);