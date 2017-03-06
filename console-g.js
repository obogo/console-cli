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
    var output = input.replace(/-(.)/g, function (match, group1) {
        return group1.toUpperCase();
    });

    if (capitalizeFirstLetter) {
        output = output[0].toUpperCase() + output.substring(1);
    }

    return output;
};

/**
 *
 * @param config
 * @param type
 * @param templateFile
 * @param destPath
 * @param createInSubdirectory boolean
 */
function copyFiles(config, type, templateFile, destPath, createInSubdirectory) {
    var destz = destPath.split('/');
    var name = destz.pop();

    readFile(path.join(templatesPath, type, templateFile), 'utf8', function (err, content) {

        var strings = {};
        strings.Name = name.toCamelCase(true);
        strings.name = name;
        strings.Names = pluralize(strings.Name);
        strings.names = pluralize(name);
        strings.namesDash = strings.name.toDash();
        strings.namesUnderscore = strings.namesDash.split('-').join('_');
        strings.prefix = config.componentPrefix;
        strings.serviceName = config.serviceName;
        content = content.supplant(strings);

        destz.push(strings.namesDash);
        destPath = destz.join('/');

        var fileExt = templateFile.split('.').pop();
        // console.log('#strings', JSON.stringify(strings, null, 4).blue);

        console.log('#createInsub', createInSubdirectory);
        var outputFile;
        if(destz.length > 1) {
            outputFile = path.join('src', 'app', type + 's', destPath + '.' + type + '.' + fileExt);
        }
        else if(createInSubdirectory === false) {
            outputFile = path.join('src', 'app', type + 's', destPath + '.' + type + '.' + fileExt);
        }
        else {
            outputFile = path.join('src', 'app', type + 's', strings.namesDash, destPath + '.' + type + '.' + fileExt);
        }
        writeFile(outputFile, content, function (err) {
            if (err) console.log(err);
            else console.log(('File created: ' + outputFile).blue);
        });
    });
}

function updateRouting(config, name) {

    var strings = strings || {};
    strings.Name = name.toCamelCase(true);
    strings.name = strings.name || name;
    strings.Names = pluralize(strings.Name);
    strings.names = pluralize(name);
    strings.namesDash = strings.name.toDash();
    strings.namesUnderscore = strings.namesDash.split('-').join('_');
    strings.prefix = config.componentPrefix;
    strings.serviceName = config.serviceName;

    var routingFile = path.join('src', 'app', 'app.routing.js');
    fs.readFile(routingFile, 'utf8', function (err, file) {
        var filez = file.split('// %route-injection%');
        filez[1] = ("\n    $stateProvider.state('{name}', {url: '/{name}', controller: '{Name}Ctrl', templateUrl: '{name}.page.html'});" + filez[1]).supplant(strings);
        fs.writeFile(routingFile, filez.join('// %route-injection%'));
    })
}

program.action(function (type, path, options) {

    var name;

    jsonfile.readFile('./console-cli.json', function (err, config) {
        switch (type) {
            case 'component':
                copyFiles(config.app, 'component', 'template.html', path);
                copyFiles(config.app, 'component', 'template.less', path);
                copyFiles(config.app, 'component', 'template.js', path);
                break;

            case 'dialog':
                name = path.split('/').pop();
                copyFiles(config.app, 'dialog', 'template.html', path);
                copyFiles(config.app, 'dialog', 'template.less', path);
                copyFiles(config.app, 'dialog', 'template.js', path);
                break;

            case 'model':
                name = path.split('/').pop();
                copyFiles(config.app, 'model', 'template.js', path, false);
                break;

            case 'pipe':
                name = path.split('/').pop();
                copyFiles(config.app, 'pipe', 'template.js', path, false);
                break;

            case 'page':
                name = path.split('/').pop();
                copyFiles(config.app, 'page', 'template.html', path);
                copyFiles(config.app, 'page', 'template.less', path);
                copyFiles(config.app, 'page', 'template.js', path);
                updateRouting(config.app, name);
                break;

            case 'service':
                name = path.split('/').pop();
                copyFiles(config.app, 'service', 'template.js', path, false);
                copyFiles(config.app, 'model', 'template.js', path, false);
                break;

            default:
                console.log(("Invalid command.").red);
        }
    });


});

program.parse(process.argv);
