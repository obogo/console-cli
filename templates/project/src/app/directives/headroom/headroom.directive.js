angular.module('app').directive('headroom', ['$transitions', function($transitions) {
    return {
        link: function($scope, $el, $attr) {
            var headroom;
            var scrollers = [];
            $el.addClass('headroom');
            var headroomHandler;
            var scrollerSelector = $scope.$eval($attr.headroom);
            var offsetY = $scope.$eval($attr.headroomOffset) || 20;

            $transitions.onStart({}, function() {
                while(scrollers.length) {
                    removeListeners(scrollers.pop());
                }
            });

            $transitions.onFinish({}, onReady);

            function removeListeners($scroller) {
                $scroller.off('scroll', headroomHandler);
            }

            function onHeadroomReady() {
                // grab an element
                var scroller = document.querySelector(scrollerSelector || ".headroom-scroller");
                if (scroller) {
                    createHeadroom(scroller);
                } else {
                    setTimeout(function() {
                        $scope.$$postDigest(onHeadroomReady);
                    });
                }
            }

            function createHeadroom(scroller) {
                // construct an instance of Headroom, passing the element
                var $scroller = angular.element(scroller);
                // use timestamps instead of debounce so it immediately responds, but doesn't keep responding.
                var last = scroller.scrollTop, state, lastChangeTime = Date.now();
                headroomHandler = function(evt) {
                    var current = evt.currentTarget.scrollTop;
                    if (current < last && state !== 'pinned' && Date.now() - lastChangeTime > 500) {
                        state = 'pinned';
                        lastChangeTime = Date.now();
                        $el.removeClass('headroom--unpinned').addClass('headroom--pinned');
                    } else if (current > last && state !== 'unpinned' && current > offsetY && Date.now() - lastChangeTime > 500) {
                        state = 'unpinned';
                        lastChangeTime = Date.now();
                        $el.removeClass('headroom--pinned').addClass('headroom--unpinned');
                    }
                    last = current;
                };
                $scroller.on('scroll', headroomHandler);
                //TODO: need to handle if there is no room to scroll.
                scrollers.push($scroller);
            }

            function onReady() {
                $scope.$$postDigest(onHeadroomReady);
            }
        }
    }
}]);