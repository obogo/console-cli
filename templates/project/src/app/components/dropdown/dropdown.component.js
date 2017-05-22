/* global angular, module, environment */
module.directive('consoleDropdown', function () {
    return {
        scope: true,
        restrict: 'E',
        link: function ($scope, $el, $attrs) {

            var popupEl = $el[0].querySelector('[name=popup]');

            function popupClickHandler(evt) {
                evt.stopPropagation();

                if($attrs.autoclose !== 'false') {
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
                setTimeout(function(){
                    $scope.$apply();
                });

                unsubscribeFromHitTest();
                setTimeout(subscribeToHitTest)
            };

            $scope.close = function () {
                $scope.show = false;
                setTimeout(function(){
                    $scope.$apply();
                });

                unsubscribeFromHitTest();
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