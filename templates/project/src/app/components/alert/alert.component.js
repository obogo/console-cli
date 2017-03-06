module.directive('consoleAlert', function (Alert) {
    return {
        scope: true,
        restrict: 'E',
        templateUrl: 'alert',
        replace: true,
        link: function ($scope, $el, $attrs) {
            $scope.alert = Alert;
        }
    };
});