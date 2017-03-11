'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('localizer', 'Take component json files. Combine them, remove duplicates and generate combined default language file', function (lang) {
        var data = this.data;
        var lang = this.lang || 'en-US';
        var usages = {};
        var report = {used:0, unused:0, missing:0};
        var log = data.log;
        var stringFilePaths = {};

        var files = grunt.file.expand(data.files);

        var writeTypes = ["string", "number", "boolean"];
        function extend(dest, src, path, filePath) {
            path = path || '';
            var p;
            for(var i in src) {
                if(src.hasOwnProperty(i)) {
                    p = path && path + '.' + i || i;
                    if (writeTypes.indexOf(typeof src[i]) === -1) {
                        dest[i] = dest[i] || {};
                        extend(dest[i], src[i], p, filePath);
                    } else {
                        dest[i] = src[i];// only writes strings.
                        stringFilePaths[p] = filePath;
                        if (data.usage) {
                            usages[p] = 0;
                        }
                    }
                }
            }
        }

        var root = {};
        for(var i = 0; i < files.length; i += 1) {
            extend(root, grunt.file.readJSON(files[i]), '', files[i]);
        }
        var content = JSON.stringify(root, null, 2);
        grunt.file.write(data.dest + '/' + lang + '.lang.json', content);




        // USAGE BELOW
        var cleanUpRX = /(\s+|^\.|"|'|\{|\})/g;
        var fileUrl;

        function findInContents(path) {
            fileUrl = path;
            var contents = grunt.file.read(path);
            contents.replace(/(^|\W|\s)locale((\.\w+)+|\(("|').*?\4)/g, handleMatch);
        }

        function handleMatch(m, g1, g2, g3) {
            // console.log('before', g2);
            var string = g2.replace(cleanUpRX, '') || g3.replace(cleanUpRX, '');
            resolveCount(root, string, usages);
        }

        function resolveCount(obj, path, count) {
            // console.log('resolveCount', path);
            var p = path.split('.'), prop;
            while(obj.hasOwnProperty(p[0]) && p.length > 1) {
                prop = p.shift();
                obj = obj[prop];
            }
            stringFilePaths[path] = fileUrl;
            count[path] = count[path] || 0;
            if (obj.hasOwnProperty(p[0])) {
                count[path] += 1;
            } else {
                count[path] = -1;
            }
        }

        function resolve(obj, path) {
            var p = path.split('.'), prop;
            while(p.length > 1) {
                prop = p.shift();
                obj = obj[prop] = obj[prop] || {};
            }
            obj[p[0]] = stringFilePaths[path];
        }

        if (data.usage) {
            // now we need to clean paths from the src and determine all strings being used.
            files = grunt.file.expand(data.usage);
            for(var i = 0; i < files.length; i += 1) {
                findInContents(files[i]);
            }
            var reportContent = {missing:{}, unused:{}, used:{}};
            for(i in usages) {
                if (usages.hasOwnProperty(i)) {
                    if (usages[i] > 0) {
                        report.used += 1;
                        resolve(reportContent.used, i);
                    } else if (usages[i] < 0) {
                        report.missing += 1;
                        resolve(reportContent.missing, i);
                    } else {
                        report.unused += 1;
                        resolve(reportContent.unused, i);
                    }
                }
            }
            // console.log(JSON.stringify(usages, null, 2));
            if (log) {
                grunt.file.write(log, JSON.stringify(reportContent, null, 2));
            }
            grunt.log.writeln(('used:'+report.used).green + (' unused:'+report.unused).yellow + (' missing:'+report.missing).red);
        }
    });
};