#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');
var readFile = require('read-file');
var writeFile = require('write');
var remedial = require('remedial');
var pluralize = require('pluralize');
var colors = require('colors');
var rootPath = path.dirname(fs.realpathSync(__filename));
var templatesPath = path.join(rootPath, 'templates');
var jsonfile = require('jsonfile');


String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toDash = function () {
    var rx = /([A-Z])/g;
    var dash = '-';

    function fn(g) {
        return dash + g.toLowerCase();
    }

    return this.replace(rx, fn);
};

String.prototype.toCamelCase = function (capitalizeFirstLetter) {
    var input = this;
    var output = input.toLowerCase().replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });

    if (capitalizeFirstLetter) {
        output = output[0].toUpperCase() + output.substring(1);
    }

    return output;
};

function createIntoSubdirectory(config, name, type, templateFile, dest, strings) {
    readFile(path.join(templatesPath, templateFile), 'utf8', function (err, content) {
        strings = strings || {};
        strings.Name = name.toCamelCase(true);
        strings.name = strings.name || name;
        strings.namesDash = strings.name.toDash();
        strings.namesUnderscore = strings.namesDash.split('-').join('_');
        strings.prefix = config.componentPrefix;
        content = content.supplant(strings);

        var fileExt = templateFile.split('.').pop();
        writeFile(path.join('src', 'app', type + 's', strings.namesDash, dest + '.' + type + '.' + fileExt), content, function (err) {
            if (err) console.log(err);
        });
    });
}

function createIntoDirectory(config, name, type, templateFile, dest, strings) {
    readFile(path.join(templatesPath, templateFile), 'utf8', function (err, content) {
        console.log('#name', name);

        strings = strings || {};
        strings.Name = name.toCamelCase(true);
        strings.name = strings.name || name;
        strings.namesDash = strings.name.toDash();
        strings.namesUnderscore = strings.namesDash.split('-').join('_');
        strings.prefix = config.componentPrefix;
        strings.serviceName = config.serviceName;
        content = content.supplant(strings);

        var fileExt = templateFile.split('.').pop();
        writeFile(path.join('src', 'app', type + 's', dest + '.' + type + '.' + fileExt), content, function (err) {
            if (err) console.log(err);
        });

    });
}

program.action(function (type, path, options) {
    console.log('#init you are here');

    fs.copySync(path.join(templatesPath, 'project'), 'test');

});

program.parse(process.argv);
