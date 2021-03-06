module.exports = function (grunt) {

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('hbjs');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    //loads the various task configuration files
    var options = {
        config: {
            src: [
                "configs/*.js",
                "tests/*/jasmine.js"
            ]
        }
    };
    var configs = require('load-grunt-configs')(grunt, options);
    grunt.initConfig(configs);

    grunt.loadNpmTasks('grunt-contrib-watch');

    // :: Development Build :: //
    grunt.registerTask('default', ['dev', 'dev_vendor']);

    grunt.registerTask('dev', [
        'ngtemplates:console_build',
        'ngAnnotate:console_dev',
        'less:console_build',
        'copy:console_build',
        'copy:languages_build',
        'compile:console_build',
        'localizer:console_build',
        'replace:console_build'
    ]);

    grunt.registerTask('dev_vendor', [
        'copy:vendor_build',
        'copy:node_modules_build'
    ]);

    // :: Production Build :: //
    grunt.registerTask('prod', ['prod_build', 'prod_vendor']);

    grunt.registerTask('prod_build', [
        'ngtemplates:console_prod',
        'ngAnnotate:console_prod',
        'less:console_prod',
        'copy:console_prod',
        'copy:languages_prod',
        'compile:console_prod',
        'localizer:console_prod'
    ]);

    grunt.registerTask('prod_vendor', [
        'copy:vendor_prod',
        'copy:node_modules_prod'
    ]);
};
