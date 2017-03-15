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
        debugger;
        var url = state.url;
        var identity = url.replace(inverseRx, '$1');
        var hasIdentity = params.hasOwnProperty(identity);
        if (indexes && identity && hasIdentity) {
            return matchIndexOf(indexes, params[identity].toString());
        }
        return -1;
    }

    return {
        link: function ($scope, $element, $attrs) {
            var container = $element;

            $transitions.onStart({}, function (trans) {
                container.removeClass('sibling parent-child back forward none');

                var state = trans.targetState().state();
                console.log('#state', state.url);
                var url = state.url;
                var index = getIndex(state, $state.indexes, trans.targetState().params());
                var prevIndex = prevState && getIndex(prevState, $state.indexes, prevStateParams) || -1;
                if (index !== -1 && prevIndex !== -1) {
                    sibling = true;
                    if (index < prevIndex) {
                        console.log('sibling', index, prevIndex);
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
                        console.log('to child');
                        container.addClass('parent-child');
                        transition = 'forward';
                    } else if (url === getParentUrl(prevState && prevState.url)) {// child to parent back
                        console.log('to parent');
                        container.addClass('parent-child');
                        transition = 'back';
                    } else {
                        console.log('otherwise');
                        // transition = 'forward';
                    }
                }
                prevState = state;
                prevStateParams = angular.copy(trans.targetState().params());
                debugger;

                container.addClass(transition);
            });

        }
    };
});