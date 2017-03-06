module.factory('Dialog', function () {
    var api = {};

    api.show = false;

    api.open = function (options) {
        if (!options.component) {
            throw new Error('Option "component" required.');
        }
        this.show = true;
        this.options = options;
    };

    api.close = function (data) {
        this.show = false;

        if (typeof this.options.close === 'function') {
            this.options.close(data);
        }
    };

    return api;
});

module.directive('consoleDialog', function (Dialog, $templateCache, $compile) {
    return {
        scope: true,
        restrict: 'E',
        link: function ($scope, $el) {

            var component, options, dialogEl, body, linkFn, content;
            $scope.dialog = Dialog;
            $scope.$watch('dialog.show', function (val) {
                if (val) {
                    options = Dialog.options;

                    dialogEl = angular.element($templateCache.get(options.template ? options.template : 'dialog'));

                    body = angular.element(dialogEl[0].querySelector('[name=body]'));
                    body.append('<' + Dialog.options.component + '></' + Dialog.options.component + '>');

                    linkFn = $compile(dialogEl[0].outerHTML);
                    component = $scope.$new();
                    content = linkFn(component);

                    $el.append(content);
                }
            });

            $scope.close = function () {
                component.$destroy();
                $el.empty();
                Dialog.close(true);
            };

        }
    };
});