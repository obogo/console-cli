/* global angular */
var module = angular.module('app', [
    'consoleTemplates',
    'ngAnimate',
    'ui.router',
    'anim-in-out',
    'localytics.directives',
    'ngLetterAvatar'
]);
module.run(function(LocaleService) {
    // LocaleService just needs to run to setup rootScope.
});

angular.element(function() {
    require('localeService').config({
            localStorageKey: 'language',
            basePath: 'languages',
            defaultLocale: 'en-US',
            fileExtension: '.lang.json',
            persistLanguage: true,
            supported: ['en-US', 'es-SP'],
            fallbacks: {'en':'en-US','sp':'es-SP'}
        })
        .load().then(function() {
            angular.bootstrap(document, ['app']);
        });
});
