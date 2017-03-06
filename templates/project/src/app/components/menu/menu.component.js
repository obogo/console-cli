module.directive('consoleMenu', function (Menu) {
    return {
        scope: true,
        restrict: 'E',
        templateUrl: 'menu',
        replace: true,
        link: function ($scope) {
            $scope.menu = Menu;
        }
    };
});