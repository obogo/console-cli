/* global angular */
var module = angular.module('app', [
    'consoleTemplates',
    'ngAnimate',
    'ui.router',
    'localytics.directives',
    'ngLetterAvatar'
]);

angular.element(function() {
    angular.bootstrap(document, ['app']);
});