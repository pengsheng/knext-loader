"use strict";

const assert = require("assert");

class Loader {
	constructor(options) {
		assert(options.app, "options.app is required");
		assert(options.baseDir, "options.baseDir is required");

		this.baseDir = options.baseDir;
		this.app = options.app;
	}

	loadToApp(directory, property, options) {
		options = Object.assign(
			{
				directory,
				target: this.app[property],
				inject: this.app
			},
			options
		);
		new FileLoader(options).load();
	}

	loadToContent(directory, property, options) {
		options = Object.assign(
			{
				directory,
				target: this.app.context,
				inject: this.app
			},
			options
		);
		new FileLoader(options).load();
	}
}

const loaders = [
	require("./mixin/config"),
	require("./mixin/model"),
	require("./mixin/middleware"),
	require("./mixin/controller"),
	require("./mixin/router")
];

for (const loader of loaders) {
	Object.assign(Loader.prototype, loader);
}

module.exports = Loader;
