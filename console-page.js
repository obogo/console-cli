#!/usr/bin/env node
var fs = require('fs-extra');
var path = require('path');
var program = require('commander');
var replace = require('replace');
var remedial = require('remedial');
var rootPath = path.dirname(fs.realpathSync(__filename));
var templatesPath = path.join(rootPath, 'templates');


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
        strings.name = strings.name || name.toCamelCase(false);
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

program.action(function (name, template, options) {

    var strings = strings || {};
    strings.Name = name.toCamelCase(true);
    strings.name = strings.name || name.toCamelCase(false);
    strings.namesDash = strings.name.toDash();
    strings.namesUnderscore = strings.namesDash.split('-').join('_');


    var routingFile = path.join(templatesPath, 'page', 'page-templates', template + '.html');
    fs.readFile(routingFile, 'utf8', function (err, content) {
        // var filez = file.split('// %route-injection%');
        // filez[1] = ("\n    $stateProvider.state('{name}', {url: '/{name}', controller: '{Name}Ctrl', templateUrl: '{name}.page.html'});" + filez[1]).supplant(strings);
        // fs.writeFile(routingFile, filez.join('// routes'));

        content = content.supplant(strings);
        fs.outputFile(path.join('src', 'app', 'pages', strings.name, strings.name + '.page.html'), content, function(err) {
            console.log('#err', err);
            if (err) console.log(err);
        });
    })
});

program.parse(process.argv);
