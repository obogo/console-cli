module.directive('consoleMenu', function () {
    return {
        scope: true,
        restrict: 'E',
        templateUrl: 'menu',
        replace: true,
        link: function ($scope, $el, $attrs) {
        }
    };
});