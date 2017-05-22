/* global angular, module, environment */
module.directive('viewTransition', function ($state, $transitions) {
    var prevState;
    var prevStateParams;
    var sibling = false;
    var transition = '';
    var matchIndexOf = require('matchIndexOf');
    var rx = /\/:\w+$/;
    var inverseRx = /^.*?:(\w+)$/;

    function getParentUrl(url) {
        if (!url) {
            return '';
        }
        var u = url.replace(rx, '');
        return u !== url ? u : '';
    }

    function getIndex(state, indexes, params) {
        var url = state.url;
        var identity = url.replace(inverseRx, '$1');
        var hasIdentity = params.hasOwnProperty(identity);
        var index;
        if (indexes && !hasIdentity && (index = indexes.indexOf(url)) !== -1) {// match pages that act as siblings
            return index;
        }
        if (indexes && identity && hasIdentity) {
            return indexes.indexOf(params[identity].toString());
        }
        return -1;
    }

    return {
        link: function ($scope, $element) {
            var container = $element;

            $transitions.onStart({}, function (trans) {
                container.removeClass('sibling parent-child back forward none');

                var state = trans.targetState().state();
                var url = state.url;
                var prevIndex = prevState && getIndex(prevState, $state.indexes, prevStateParams);
                var nextIndex = getIndex(state, $state.indexes, trans.targetState().params());
                if (nextIndex !== -1 && prevIndex !== -1) {
                    sibling = true;
                    if (nextIndex < prevIndex) {
                        container.addClass('sibling');
                        transition = 'back';
                    } else {
                        container.addClass('sibling');
                        transition = 'forward';
                    }
                } else { // otherwise we are using the URL to figure out transition (if any)
                    var parentUrl = getParentUrl(url);
                    sibling = false;
                    if (prevState && parentUrl === prevState.url) {// child to parent back
                        container.addClass('parent-child');
                        transition = 'forward';
                    } else if (url === getParentUrl(prevState && prevState.url)) {// child to parent back
                        container.addClass('parent-child');
                        transition = 'back';
                    } else {
                        // do nothing
                        // console.log('otherwise');
                        // transition = 'forward';
                    }
                }
                prevState = state;
                prevStateParams = angular.copy(trans.targetState().params());

                container.addClass(transition);
            });

        }
    };
});