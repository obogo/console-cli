module.directive('{prefix}{Name}Dialog', function (Dialog, resolve) {
    return {
        templateUrl: '{namesDash}.dialog',
        link: function ($scope, $el, $attrs) {
            /*
             $scope.time = Dialog.options.locals.time;
             $scope.time = resolve(Dialog).get('optinos.locals.time');
             */
        }
    };
});