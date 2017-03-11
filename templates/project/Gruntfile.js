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
    grunt.registerTask('default', ['dev', 'dev_vendor']);

    // :: Development Build :: //
    grunt.registerTask('dev', [
        'ngtemplates:console_build',
        'ngAnnotate:console_dev',
        'less:console_build',
        'copy:console_build',
        'copy:languages_build',
        'compile:console_build'
    ]);

    grunt.registerTask('dev_vendor', [
        'copy:vendor_build',
        'copy:node_modules_build'
    ]);

    // :: Production Build :: //
    grunt.registerTask('prod', [
        'ngtemplates:console_dist',
        'ngAnnotate:console_prod',
        'less:console_dist',
        'copy:console_dist',
        'copy:languages_dist',
        'compile:console_dist'
    ]);

    grunt.registerTask('prod_vendor', [
        'copy:vendor_dist',
        'copy:node_modules_dist'
    ]);
};
