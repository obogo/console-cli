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
    // LocaleService auto loads.
});

angular.element(function() {
    angular.bootstrap(document, ['app']);
});
