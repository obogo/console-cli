module.directive('consoleSampleDialog', function (Dialog, resolve) {
    return {
        templateUrl: 'sample.dialog',
        link: function ($scope, $el, $attrs) {
            /*
             $scope.time = Dialog.options.locals.time;
             $scope.time = resolve(Dialog).get('optinos.locals.time');
             */
        }
    };
});