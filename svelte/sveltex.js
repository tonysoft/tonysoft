'use strict';

var exports = {};
Object.defineProperty(exports, '__esModule', { value: true });

import {internal} from "./internal.js"
//var internal = require('./internal');



Object.defineProperty(exports, 'afterUpdate', {
	enumerable: true,
	get: function () {
		return internal.afterUpdate;
	}
});
Object.defineProperty(exports, 'beforeUpdate', {
	enumerable: true,
	get: function () {
		return internal.beforeUpdate;
	}
});
Object.defineProperty(exports, 'createEventDispatcher', {
	enumerable: true,
	get: function () {
		return internal.createEventDispatcher;
	}
});
Object.defineProperty(exports, 'getContext', {
	enumerable: true,
	get: function () {
		return internal.getContext;
	}
});
Object.defineProperty(exports, 'onDestroy', {
	enumerable: true,
	get: function () {
		return internal.onDestroy;
	}
});
Object.defineProperty(exports, 'onMount', {
	enumerable: true,
	get: function () {
		return internal.onMount;
	}
});
Object.defineProperty(exports, 'setContext', {
	enumerable: true,
	get: function () {
		return internal.setContext;
	}
});
Object.defineProperty(exports, 'tick', {
	enumerable: true,
	get: function () {
		return internal.tick;
	}
});

var exportList = "";
for (var exported in exports) {
    exportList += "export { " + exported + " }\n"
}

var createEventDispatcher = exports['createEventDispatcher']

export { createEventDispatcher }

