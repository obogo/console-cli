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
                        'ngletteravatar/dist/*'
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
            }
        }
    };
};