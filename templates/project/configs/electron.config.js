/* global module */
module.exports = function (grunt, options) {
    return {
        tasks: {
            copy: {
                "console_prod": {
                    expand: true,
                    flatten: false,
                    cwd: 'src',
                    src: [
                        'index.html',
                        'vendor/**/*',
                        'assets/**/*'
                    ],
                    dest: '../electron/console/',
                    filter: 'isFile'
                },
                "languages_prod": {
                    expand: true,
                    flatten: false,
                    cwd: 'languages',
                    src: [
                        '**/*.lang.json'
                    ],
                    dest: '../electron/console/languages',
                    filter: 'isFile'
                },
                // "bower": {
                //     expand: true,
                //     cwd: 'bower_components',
                //     src: [
                //         'angular-localization/angular-localization*.js'
                //     ],
                //     dest: '../electron/console/vendor',
                //     filter: 'isFile'
                // },
                "vendor_prod": {
                    expand: true,
                    // flatten: true,
                    cwd: 'vendor',
                    src: [
                        'require-lite/*.js',
                        'fonts/*'
                    ],
                    dest: '../electron/console/vendor',
                    filter: 'isFile'
                },
                "node_modules_prod": {
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
                    dest: '../electron/console/vendor',
                    filter: 'isFile'
                }
            },
            ngtemplates: {
                "console_prod": {
                    cwd: 'src',
                    src: '**/*.html',
                    dest: '../electron/console/assets/console-templates.js',
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
                "console_prod": {
                    options: {},
                    files: {
                        "../electron/console/assets/console.js": [
                            "environment/environment.prod.js",
                            "src/app/app.bootstrap.js",
                            "src/app/**/*.js"
                        ]
                    }
                }
            },
            less: {
                "console_prod": {
                    options: {
                        strictImports: true
                    },
                    files: {
                        '../electron/console/assets/styles.css': [
                            'src/styles/**/styles.less',
                            'src/app/**/*.less'
                        ]
                    }
                }
            },
            compile: {
                "console_prod": {
                    wrap: 'consoleUtils', // this is your global namespace
                    name: "consoleUtils",
                    filename: 'console-utils',
                    build: '../electron/console/assets',
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
                "console_prod": {
                    lang: 'en-US',
                    files: 'src/app/**/*.json',
                    dest: '../electron/console/languages/',
                    log: 'logs/language.report.json',
                    usage: ['src/app/**/*.js', 'src/app/**/*.html', 'src/index.html', 'src/index-cdn.html']
                }
            }
        }
    };
};