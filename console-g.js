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

    var name;

    jsonfile.readFile('console-cli.json', function (err, config) {
        switch (type) {

            case 'component':
                name = path.split().pop().toLowerCase();
                createIntoSubdirectory(config.app, name, 'component', 'component/template.html', path);
                createIntoSubdirectory(config.app, name, 'component', 'component/template.less', path);
                createIntoSubdirectory(config.app, name, 'component', 'component/template.js', path);
                break;

            case 'dialog':
                name = path.split().pop().toLowerCase();
                createIntoSubdirectory(config.app, name, 'dialog', 'dialog/template.html', path);
                createIntoSubdirectory(config.app, name, 'dialog', 'dialog/template.less', path);
                createIntoSubdirectory(config.app, name, 'dialog', 'dialog/template.js', path);
                break;

            case 'model':
                name = path.split().pop().toLowerCase();
                createIntoDirectory(config.app, name, 'model', 'model/template.js', path);
                break;

            case 'pipe':
                name = path.split().pop();
                createIntoDirectory(config.app, name, 'pipe', 'pipe/template.js', path);
                break;

            case 'page':
                name = path.split().pop().toLowerCase();
                createIntoSubdirectory(config.app, name, 'page', 'page/template.html', path);
                createIntoSubdirectory(config.app, name, 'page', 'page/template.less', path);
                createIntoSubdirectory(config.app, name, 'page', 'page/template.js', path);
                break;

            case 'service':
                name = path.split().pop().toLowerCase();
                createIntoDirectory(config.app, name, 'service', 'service/template.js', path);
                break;
        }
    });


});

program.parse(process.argv);
