/* global module */
module.exports = function (grunt, options) {
    return {
        tasks: {
            copy: {
                "console_build": {
                    expand: true,
                    flatten: false,
                    cwd: 'src',
                    src: [
                        'index.html',
                        'vendor/**/*'
                    ],
                    dest: 'build/',
                    filter: 'isFile'
                },
                "languages_build": {
                    expand: true,
                    flatten: false,
                    cwd: 'languages',
                    src: [
                        '**/*.lang.json'
                    ],
                    dest: 'build/languages',
                    filter: 'isFile'
                },
                // "bower": {
                //     expand: true,
                //     cwd: 'bower_components',
                //     src: [
                //         'angular-localization/angular-localization*.js'
                //     ],
                //     dest: 'build/vendor',
                //     filter: 'isFile'
                // },
                "vendor_build": {
                    expand: true,
                    // flatten: true,
                    cwd: 'vendor',
                    src: [
                        'require-lite/*.js',
                        'fonts/*'
                    ],
                    dest: 'build/vendor',
                    filter: 'isFile'
                },
                "node_modules_build": {
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
                        'jquery/dist/*',
                        'angular/angular*.js',
                        'angular-animate/angular*.js',
                        'angular-sanitize/angular*.js',
                        'angular-ui-router/release/angular*.js',
                        'angular-chosen-localytics/dist/*',
                        'ngletteravatar/dist/*',
                        'offline-js/offline*.js',
                        'offline-js/themes/*',
                        'headroom.js/dist/*'
                    ],
                    dest: 'build/vendor',
                    filter: 'isFile'
                }
            },
            ngtemplates: {
                "console_build": {
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'build/assets/console-templates.js',
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
                "console_build": {
                    options: {},
                    files: {
                        "build/assets/console.js": [
                            "environment/environment.js",
                            "src/app/app.bootstrap.js",
                            "src/app/**/*.js"
                        ]
                    }
                },
                "console_dev": {
                    options: {},
                    files: {
                        "build/assets/console.js": [
                            "environment/environment.dev.js",
                            "src/app/app.bootstrap.js",
                            "src/app/**/*.js"
                        ]
                    }
                }
            },
            less: {
                "console_build": {
                    options: {
                        strictImports: true
                    },
                    files: {
                        'build/assets/styles.css': [
                            'src/styles/**/styles.less',
                            'src/app/**/*.less'
                        ]
                    }
                }
            },
            compile: {
                "console_build": {
                    wrap: 'consoleUtils', // this is your global namespace
                    name: "consoleUtils",
                    filename: 'console-utils',
                    build: 'build/assets',
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
                console_build: {
                    lang: 'en-US',
                    files: 'src/app/**/*.json',
                    dest: 'build/languages/',
                    log: 'logs/language.report.json',
                    usage: ['src/app/**/*.js', 'src/app/**/*.html', 'src/index.html', 'src/index-cdn.html']
                }
            }
        }
    };
};