module.factory('Menu', function () {
    var api = {};

    api.show = false;

    api.open = function () {
        this.show = true;
    };

    api.close = function () {
        this.show = false;
    };

    api.toggle = function() {
        this.show = !this.show;
    };

    return api;
});

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