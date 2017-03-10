module.component('consoleDialog', {
    controller: function ($scope, $element, Dialog, $templateCache, $compile) {
        var ctrl = this;
        var component, options, dialogEl, body, linkFn, content;

        ctrl.close = function () {
            component.$destroy();
            $element.empty();
            Dialog.close(true);
        };

        ctrl.dialog = Dialog;

        $scope.$watch('$ctrl.dialog.show', function (val) {
            if (val) {
                options = Dialog.options;

                dialogEl = angular.element($templateCache.get(options.template ? options.template : 'dialog'));

                body = angular.element(dialogEl[0].querySelector('[name=body]'));
                body.append('<' + options.component + '></' + options.component + '>');

                linkFn = $compile(dialogEl[0].outerHTML);
                component = $scope.$new();
                content = linkFn(component);

                $element.append(content);
            }
        });
    }
});