/* global angular, module, environment */
module.component('consoleMobileInput', {
    templateUrl: 'mobile-input',
    controller: function ($scope, $element, MobileEditor) {
        var ctrl = this;
        var editorOptions;

        ctrl.cancel = function () {
            // hide view
            MobileEditor.hide($element, editorOptions);
        };

        ctrl.save = function () {
            // update the value and render change
            editorOptions.ngModelCtrl.$setViewValue(ctrl.value);
            editorOptions.ngModelCtrl.$render();

            // hide view
            ctrl.cancel();
        };

        $scope.$on('consoleMobileInput', function (evt, options) {
            editorOptions = options;

            // add attrs and value to be used by view
            ctrl.attrs = options.attrs;
            ctrl.value = options.ngModelCtrl.$modelValue;

            // show view
            MobileEditor.show($element).then(function() {
                $element.find('input').focus().select();
            });
        });

    }
});