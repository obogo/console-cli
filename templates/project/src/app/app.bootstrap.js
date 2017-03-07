/* global angular */
var module = angular.module('app', [
    'consoleTemplates',
    'ngAnimate',
    'ui.router',
    'anim-in-out',
    'localytics.directives',
    'ngLetterAvatar'
]);

angular.element(function() {
    angular.bootstrap(document, ['app']);
});
