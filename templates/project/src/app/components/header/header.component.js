module.directive('consoleHeader', function (Menu) {
    return {
        scope: true,
        restrict: 'E',
        templateUrl: 'header',
        replace: true,
        link: function ($scope, $el, $attrs) {
            $scope.menu = Menu;
        }
    };
});