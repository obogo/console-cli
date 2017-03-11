/* global module */
module.exports = function (grunt, options) {
    return {
        tasks: {
            copy: {
                "console": {
                    expand: true,
                    flatten: false,
                    cwd: 'src',
                    src: [
                        'index.html',
                        'vendor/**/*'
                    ],
                    dest: 'phonegap/',
                    filter: 'isFile'
                },
                "languages": {
                    expand: true,
                    flatten: false,
                    cwd: 'languages',
                    src: [
                        '**/*.lang.json'
                    ],
                    dest: 'phonegap/languages',
                    filter: 'isFile'
                },
                // "bower": {
                //     expand: true,
                //     cwd: 'bower_components',
                //     src: [
                //         'angular-localization/angular-localization*.js'
                //     ],
                //     dest: 'phonegap/vendor',
                //     filter: 'isFile'
                // },
                "vendor": {
                    expand: true,
                    // flatten: true,
                    cwd: 'vendor',
                    src: [
                        'require-lite/*.js',
                        'fonts/*'
                    ],
                    dest: 'phonegap/vendor',
                    filter: 'isFile'
                },
                "node_modules": {
                    expand: true,
                    cwd: 'node_modules',
                    src: [
                        '!*.md',
                        '!*.json',
                        'normalize.css/normalize.css',
                        'material-design-icons/iconfont/*',
                        'animate.css/animate.min.css',
                        'animate.css/animate.min.css',
                        'angular-ui-router-anim-in-out/css/anim-in-out.css',
                        'angular-ui-router-anim-in-out/anim-in-out.js',
                        'chosen-js/*',
                        'jquery/phonegap/*',
                        'angular/angular*.js',
                        'angular-animate/angular*.js',
                        'angular-sanitize/angular*.js',
                        'angular-ui-router/release/angular*.js',
                        'angular-chosen-localytics/phonegap/*',
                        'ngletteravatar/phonegap/*',
                        'offline-js/offline*.js',
                        'offline-js/themes/*'
                    ],
                    dest: 'phonegap/vendor',
                    filter: 'isFile'
                }
            },
            ngtemplates: {
                "console": {
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'phonegap/assets/console-templates.js',
                    options: {
                        module: 'consoleTemplates',
                        quotes: 'single',
                        standalone: true,
                        url: function (url) {
                            return url.split('/').pop()
                                .split('.component').join('')
                                .split('.html').join('');
                        },
                        htmlmin: {
                            collapseBooleanAttributes: true,
                            collapseWhitespace: true,
                            removeAttributeQuotes: true,
                            removeComments: true, // Only if you don't use comment directives!
                            removeEmptyAttributes: true,
                            removeRedundantAttributes: true,
                            removeScriptTypeAttributes: true,
                            removeStyleLinkTypeAttributes: true
                        }
                    }
                }
            },
            ngAnnotate: {
                "console": {
                    options: {},
                    files: {
                        "phonegap/assets/console.js": [
                            "environment/environment.js",
                            "src/app/app.bootstrap.js",
                            "src/app/**/*.js"
                        ]
                    }
                },
                "console-dev": {
                    options: {},
                    files: {
                        "phonegap/assets/console.js": [
                            "environment/environment.dev.js",
                            "src/app/app.bootstrap.js",
                            "src/app/**/*.js"
                        ]
                    }
                },
                "console-prod": {
                    options: {},
                    files: {
                        "phonegap/assets/console.js": [
                            "environment/environment.prod.js",
                            "src/app/app.bootstrap.js",
                            "src/app/**/*.js"
                        ]
                    }
                }
            },
            less: {
                "console": {
                    options: {
                        strictImports: true
                    },
                    files: {
                        'phonegap/assets/styles.css': [
                            'src/styles/**/styles.less',
                            'src/app/**/*.less'
                        ]
                    }
                }
            },
            compile: {
                "console": {
                    wrap: 'consoleUtils', // this is your global namespace
                    name: "consoleUtils",
                    filename: 'console-utils',
                    build: 'phonegap/assets',
                    scripts: {
                        embedRequire: false,
                        ignorePatterns: true,
                        inspect: ['src/app/**/**.js'],
                        src: ['src/app/**/*.js'], // search through all JS file in specified directories
                        import: [], // what files should we import and compile
                        export: [''], // hide all from view
                        report: false,
                        match: function(searchText) {
                            var matches = [];
                            searchText.replace(/(^|\s)require\((\"|\')(.*?)\2\)/g, function(m, g1, g2, g3) {
                                matches.push(g3);
                            });
                            return matches;
                        }
                    }
                }
            },
            localizer: {
                console: {
                    lang: 'en-US',
                    files: 'src/app/**/*.json',
                    dest: 'prod/languages/'
                }
            }
        }
    };
};