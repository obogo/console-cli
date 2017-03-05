/* global module */
module.exports = function (grunt, options) {
    return {
        tasks: {
            compile: {
                "services": {
                    wrap: 'console', // this is your global namespace
                    filename: 'services',
                    build: 'build/console',
                    scripts: {
                        embedRequire: false,
                        ignorePatterns: false,
                        src: [
                            'src/services/api.js'
                        ],
                        import: [
                            'servicesApi'
                        ]
                    }
                }
            }
        }
    };
};