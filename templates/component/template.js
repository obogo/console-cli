module.directive('{prefix}{Name}', function () {
    return {
        scope: true,
        restrict: 'E',
        templateUrl: '{name}',
        replace: true,
        link: function ($scope, $el, $attrs) {
        }
    };
});