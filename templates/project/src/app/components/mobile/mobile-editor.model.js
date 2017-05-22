/* global angular, module, environment */
module.factory('MobileEditor', function ($rootScope, $timeout, $q, $state, $location, $window, Animation) {
    var classes = 'animated-4x slideInUp slideOutDown show';
    var showClasses = 'animated-4x slideInUp';
    var hideClasses = 'animated-4x slideOutDown';
    var offEnd;
    var $el;
    var deferred;

    function onShowEnd() {
        offEnd();
        deferred.resolve();
    }

    function onHideEnd() {
        offEnd();
        $el.removeClass(classes);
        deferred.resolve();
        $el = null;
    }

    function invalidate() {
        var params = $location.search();

        if (params.editMode === 'true') {
            if ($el) {
                offEnd = Animation.onEnd($el[0], onShowEnd);
                $el.addClass(showClasses);
                $el.addClass('show');
            }
            else {
                $window.history.back();
            }
        }
        else if ($el) {
            $el.removeClass(showClasses);
            setTimeout(function () {
                offEnd = Animation.onEnd($el[0], onHideEnd);
                $el.addClass(hideClasses);
            });
        }
    }

    var api = {};

    api.show = function ($element) {
        deferred = $q.defer();
        $el = $element;

        $location.search({editMode: "true"});

        return deferred.promise;
    };

    api.hide = function ($element) {
        deferred = $q.defer();
        $el = $element;

        $window.history.back();

        return deferred.promise;
    };

    $rootScope.$on('$locationChangeSuccess', invalidate);
    invalidate();

    return api;
});