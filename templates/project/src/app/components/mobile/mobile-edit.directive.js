/* global angular, module, environment */
module.directive('mobileEdit', function ($timeout) {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ngModelCtrl) {
            var mobileQuery = window.matchMedia("(max-width: " + environment.mobilePhoneWidth + ")");

            function changeHandler() {
                if (mobileQuery.matches) {
                    attrs.$set('readonly', '');
                    attrs.$set('autocomplete', 'off');
                }
                else {
                    attrs.$set('readonly');
                    attrs.$set('autocomplete', 'on');
                }
            }

            function clickHandler(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                if (mobileQuery.matches) {
                    scope.$root.$broadcast(attrs.mobileEdit, {
                        ngModelCtrl: ngModelCtrl,
                        attrs: attrs
                    });
                }
                scope.$apply();
            }

            el[0].addEventListener('click', clickHandler, true);

            scope.$on('$destroy', function () {
                el[0].removeEventListener('click', clickHandler, true);
            });

            mobileQuery.addListener(changeHandler);
            changeHandler();
        }
    };
});