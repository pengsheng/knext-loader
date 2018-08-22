"use strict";

module.exports = {
	loadController () {
    options = {
      initializer: () => {

      }
    }
    this.loadToApp(this.baseDir, 'controller', options)
  }
};
