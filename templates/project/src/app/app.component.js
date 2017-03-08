/* global angular, module */
module.directive('app', function (Menu) {
    return {
        templateUrl: 'app',
        replace: true,
        link: function ($scope, $el, $attrs) {
            $scope.menu = Menu;
        }
    };
});