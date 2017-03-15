module.directive('pageTransition', function ($state, $stateParams) {
    var container;
    var prevState;
    var prevStateParams;
    var sibling = false;
    var transition = '';
    var matchIndexOf = require('matchIndexOf');
    var rx = /\/:\w+$/;
    var inverseRx = /^.*?:(\w+)$/;
    var container = angular.element(document.querySelector('.ui-view-container'));

    function getParentUrl(url) {
        if (!url) {
            return '';
        }
        var u = url.replace(rx, '');
        return u !== url ? u : '';
    }

    function getIndex($state, indexes, $params) {
        var index, prop, url = $state.url;
        if (indexes && (prop = url.replace(inverseRx, '$1')) && $stateParams.hasOwnProperty(prop) && (index = matchIndexOf(indexes, $params[prop])) !== -1) {
            return index;
        }
        return -1;
    }

    return {
        link: function () {

            container.removeClass('sibling parent-child back forward none');

            var index = getIndex($state.current, $state.indexes, $stateParams), prevIndex = prevState && getIndex(prevState, $state.indexes, prevStateParams) || -1;
            var url = $state.current.url;
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
            } else {
                sibling = false;
                if (prevState && getParentUrl(url) === prevState.url) {// child to parent back
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
            prevState = $state.current;
            prevStateParams = require('extend')({}, $stateParams);

            container.addClass(transition);
        }
    };


    // list of viewStates
    // if in list, and before current move right
    // otherwise move left

});