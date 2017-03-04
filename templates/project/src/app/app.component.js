/* global angular, module */
module.directive('app', function () {
    return {
        templateUrl: 'app',
        replace: true,
        link: function ($scope, $el, $attrs) {
        }
    };
});