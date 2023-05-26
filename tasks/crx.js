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
      const startDateTime = new Date();
      var done = this.async();
      var self = this;

      let timeoutMillonseconds;
      const options = self.options();
      if (options) {
        timeoutMillonseconds = options.timeoutMillonseconds || 10000;
      }
      grunt.log.writeln("Task will end in : " + timeoutMillonseconds + " millseconds.");
      let timeout = setTimeout(() => {
        done();
      }, timeoutMillonseconds);

      this.requiresConfig("crx");

      this.files.forEach(function (taskConfig) {
        var extension = extensionHelper.createObject(taskConfig, {
          options: self.options()
        });

        // Building
        extensionHelper.build(taskConfig, extension)
          .then(() => autoupdateHelper.buildXML(taskConfig, extension))
          .finally(() => {
            clearTimeout(timeout);
            done();
            grunt.log.writeln("Task end in : " + (new Date() - startDateTime) + " millseconds.");
            grunt.log.writeln("Done.");
          })
      });
    }
  );
};
