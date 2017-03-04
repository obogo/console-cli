module.directive('consoleHeader', function () {
    return {
        scope: true,
        restrict: 'E',
        templateUrl: 'header',
        replace: true,
        link: function ($scope, $el, $attrs) {
        }
    };
});