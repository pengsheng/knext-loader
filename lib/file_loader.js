"use strict";

const assert = require("assert");
const path = require("path");
const glob = require("glob");

class FileLoader {
	constructor(options) {
		assert(options.directory, "options.directory is required");

		options = Object.assign(
			{
				cwd: options.directory,
				pattern: "*.js",
				dot: false,
				matchBase: true,
				nodir: true
			},
			options
		);
		this.options = options;
	}

	load() {
		const files = glob.sync(this.options.pattern, this.options);
		if (!files) {
			return undefined;
		}
		const target = [];
		files.forEach(file => {
			let pathName = path
				.relative(this.options.directory, file.split(".")[0])
				.replace(/\//g, ".");
			let exports = getExports(file);
			target.push({ pathName, exports });
		});

		return target;
	}
}

function getExports(filePath) {
	try {
		const extname = path.extname(filePath);
		if (extname && !require.extensions[extname]) {
			return fs.readFileSync(filepath);
		}

		const obj = require(filepath);
		if (!obj) return obj;

		if (obj.__esModule) return "default" in obj ? obj.default : obj;
		return obj;
	} catch (err) {
		throw err;
	}
}

module.exports = FileLoader;
