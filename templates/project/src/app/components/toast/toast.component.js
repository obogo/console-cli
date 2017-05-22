/* global angular, module, environment */
module.component('consoleToast', {
    templateUrl: 'toast',
    controller: function ($element, Toast, Animation) {
        var $firstChild = angular.element($element[0].firstChild);
        var animateClasses = 'animate-4x fadeInDown fadeInUp fadeOutDown fadeOutUp';
        var pinToClasses = 'top left bottom right';
        var clearOnShowEnd, clearOnHideEnd, prevToast, timer;
        var classes = '';

        function getShowClasses() {
            var pinTo = Toast.current.options.pinTo;
            if (pinTo.indexOf('top') !== -1) {
                return 'animated-4x fadeInDown';
            }
            return 'animated-4x fadeInUp';
        }

        function getHideClasses() {
            if (Toast.current && Toast.current.options) {
                var pinTo = Toast.current.options.pinTo;
                if (pinTo.indexOf('top') !== -1) {
                    return 'animated-4x fadeOutUp';
                }
            }
            return 'animated-4x fadeOutDown';
        }

        function clearEvents() {
            if (clearOnShowEnd) {
                clearOnShowEnd();
            }

            if (clearOnHideEnd) {
                clearOnHideEnd();
            }

            clearOnShowEnd = null;
            clearOnHideEnd = null;
        }

        function showEndHandler() {
            clearOnShowEnd();

            $firstChild.removeClass(animateClasses);
            $element.find('.console-btn').addClass('console-smooth');

            clearOnHideEnd = Animation.onEnd($firstChild[0], hideEndHandler);

            var hideDelay = Math.max(0, Toast.current.options.hideDelay);
            // if (!hideDelay && Toast.hasNext()) {
            //     hideDelay = 500;
            // }

            if (hideDelay) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    $firstChild.addClass(getHideClasses());
                }, hideDelay);
            }
        }

        function hideEndHandler() {
            $element.find('.console-btn').removeClass('console-smooth');
            clearOnHideEnd();
            Toast.next();
        }

        var ctrl = this;
        ctrl.toast = Toast;

        ctrl.action = function(evt) {
            evt.stopPropagation();
            if(typeof Toast.current.options.onAction === 'function') {
                Toast.current.options.onAction();
            }
            // ctrl.close(true);
        };

        ctrl.close = function (forceClose) {
            if(Toast.current.options.closeOnClick || forceClose) {
                clearTimeout(timer);
                $firstChild.addClass(getHideClasses());
            }
        };

        ctrl.$doCheck = function () {
            if (Toast.current && prevToast !== Toast.current) {
                prevToast = Toast.current;
                clearEvents();
                $element.removeClass(classes);
                $element.removeClass(pinToClasses);
                $element.addClass(Toast.current.options.pinTo);
                clearOnShowEnd = Animation.onEnd($firstChild[0], showEndHandler);
                $firstChild.removeClass(animateClasses);
                $firstChild.addClass(getShowClasses());
                classes = Toast.current.options.classes;
                $element.addClass(classes);
            }
        };

        ctrl.$onDestroy = function () {
            clearEvents();
        };

        Toast.onClose(function() {
            ctrl.close(true);
        });
    }
});