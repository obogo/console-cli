/* global angular, module, environment */
module.directive('consoleDropdown', function () {
    return {
        link: function ($scope, $el, $attrs) {

            var popupEl = $el[0].querySelector('[name=popup]');

            function popupClickHandler(evt) {
                evt.stopPropagation();

                if ($attrs.autoclose !== 'false') {
                    $scope.close();
                }
            }

            function documentClickHandler() {
                $scope.close();
            }

            function subscribeToHitTest() {
                popupEl.addEventListener('click', popupClickHandler);
                document.addEventListener('click', documentClickHandler);
            }

            function unsubscribeFromHitTest() {
                popupEl.removeEventListener('click', popupClickHandler);
                document.removeEventListener('click', documentClickHandler);
            }

            $scope.show = false;

            $scope.open = function () {
                $scope.show = true;
                unsubscribeFromHitTest();
                setTimeout(subscribeToHitTest);
                setTimeout(function () {
                    $scope.$apply()
                });
            };

            $scope.close = function () {
                $scope.show = false;
                unsubscribeFromHitTest();
                setTimeout(function () {
                    $scope.$apply()
                });
            };

            $scope.toggle = function () {
                if ($scope.show) {
                    $scope.close();
                } else {
                    $scope.open();
                }
            }
        }
    };
});