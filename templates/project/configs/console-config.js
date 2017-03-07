/* global module */
module.exports = function (grunt, options) {
    return {
        tasks: {
            watch: {
                scripts: {
                    files: ['src/**/*'],
                    tasks: ['console', 'services'], // only these so we are not copying over a bunch of deps each time
                    options: {
                        livereload: true
                    }
                }
            },
            copy: {
                "console": {
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
                "vendor": {
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
                "node_modules": {
                    expand: true,
                    cwd: 'node_modules',
                    src: [
                        '!*.md',
                        '!*.json',
                        'normalize.css/normalize.css',
                        'material-design-icons/iconfont/*',
                        'animate.css/animate.min.css',
                        'chosen-js/*',
                        'jquery/dist/*',
                        'angular/angular*.js',
                        'angular-animate/angular*.js',
                        'angular-sanitize/angular*.js',
                        'angular-ui-router/release/angular*.js',
                        'angular-chosen-localytics/dist/*',
                        'ngletteravatar/dist/*',
                        'offline-js/offline*.js',
                        'offline-js/themes/*'
                    ],
                    dest: 'build/vendor',
                    filter: 'isFile'
                }
            },
            ngtemplates: {
                "console": {
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'build/console/console-templates.js',
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
                        "build/console/console.js": [
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
                        'build/console/styles.css': [
                            'src/styles/styles.less',
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
                    build: 'build/console',
                    scripts: {
                        embedRequire: false,
                        ignorePatterns: true,
                        inspect: ['src/app/**/**.js'],
                        src: ['src/app/**/*.js'], // search through all JS file in src src directory
                        import: [], // what files should we import and compile
                        export: [''], // hide all from view
                        report: 'verbose',
                        match: function(searchText) {
                            var matches = [];
                            searchText.replace(/(^|\s)require\((\"|\')(.*?)\2\)/g, function(m, g1, g2, g3) {
                                matches.push(g3);
                            });
                            return matches;
                        }
                    }
                }
            }
        }
    };
};