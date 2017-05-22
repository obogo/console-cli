/* global angular, module, environment */
module.component('consoleMobilePassword', {
    templateUrl: 'mobile-password',
    controller: function ($scope, $element, MobileEditor, PasswordValidation) {
        var ctrl = this;
        var editorOptions;

        ctrl.cancel = function () {
            // hide view
            MobileEditor.hide($element, editorOptions);
        };

        ctrl.check = function() {
            if(ctrl.validate) {
                var password = ctrl.value;
                ctrl.checkResults = PasswordValidation.check(password);
            }
        };

        ctrl.save = function () {
            // update the value and render change
            editorOptions.ngModelCtrl.$setViewValue(ctrl.value);
            editorOptions.ngModelCtrl.$render();

            // hide view
            ctrl.cancel();
        };

        $scope.$on('consoleMobilePassword', function (evt, options) {
            editorOptions = options;

            // add attrs and value to be used by view
            ctrl.attrs = options.attrs;
            ctrl.value = options.ngModelCtrl.$modelValue;
            ctrl.validate = ctrl.attrs.mobileEditValidation === 'true';

            // show view
            MobileEditor.show($element).then(function() {
                $element.find('input').focus().select();
            });
        });

    }
});