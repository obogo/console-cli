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
    grunt.registerTask('default', ['console', 'services']);

    grunt.registerTask('services', [
        'compile'
    ]);

    grunt.registerTask('console', [
        'ngtemplates:console',
        'ngAnnotate:console',
        'less:console',
        'copy:console',
        'copy:bower'
    ]);
};
