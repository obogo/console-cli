/* global module */
module.exports = function (grunt, options) {
    return {
        tasks: {
            watch: {
                scripts: {
                    files: ['src/**/*', 'environment/*', 'languages/*'],
                    tasks: ['dev'], // only these so we are not copying over a bunch of deps each time
                    options: {
                        livereload: true
                    }
                }
            }
        }
    };
};