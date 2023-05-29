/*
 * grunt-crx
 * https://github.com/oncletom/grunt-crx
 *
 * Copyright (c) 2012 oncletom
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function (grunt) {
  var extensionHelper = require("./../lib/crx").init(grunt);
  var autoupdateHelper = require("./../lib/autoupdate").init();

  grunt.registerMultiTask(
    "crx",
    "Package Chrome Extensions, the simple way.",
    function () {
      const self = this;
      this.requiresConfig("crx");

      const done = self.async();

      let counter = 0;
      const fileLength = this.files.length;
      const interval = setInterval(function () {
        if (counter === fileLength) {
          clearInterval(interval);
          done();
          grunt.log.writeln("Task Done.");
        }
      }, 100);

      this.files.forEach(function (taskConfig) {
        const startDateTime = new Date();
        var extension = extensionHelper.createObject(taskConfig, {
          options: self.options()
        });

        // Building
        extensionHelper.build(taskConfig, extension)
          .then(() => autoupdateHelper.buildXML(taskConfig, extension))
          .then(() => {
            counter++;
            grunt.log.ok("Create file:" + (new Date() - startDateTime) + " milliseconds.");
          })
          .catch(e => {
            grunt.log.error("Encounter an error:");
            grunt.log.error(e);
            grunt.log.warn('Please tell us the bugs: <https://github.com/volnet/grunt-crx/issues>');
            
            counter = fileLength;
            done();
          })
      });
    }
  );
};
