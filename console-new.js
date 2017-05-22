#!/usr/bin/env node
var fs = require('fs-extra');
var path = require('path');
var program = require('commander');
var replace = require('replace');
var rootPath = path.dirname(fs.realpathSync(__filename));
var templatesPath = path.join(rootPath, 'templates');

program.action(function (productName, dest, options) {

    productName = productName || 'My Product';
    dest = typeof dest === 'string' ? dest : 'test';
    fs.copySync(path.join(templatesPath, 'project'), dest);
    replace({
        regex: '{AppName}',
        replacement: productName,
        paths: [dest],
        recursive: true,
        silent: true
    });

    console.log('Project initialized!'.green);
    console.log('Run the following commands:');
    console.log('cd'.blue, dest.blue, ';npm install;grunt;grunt watch'.blue);
    console.log('Use "grunt watch"'.blue, 'to have app reload automatically on changes');
});

program.parse(process.argv);
