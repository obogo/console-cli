module.directive('pageTransition', function ($state, $stateParams) {
    var container;
    var prevState;
    var prevStateParams;
    var sibling = false;
    var transition = '';
    var matchIndexOf = require('matchIndexOf');
    var rx = /\/:\w+$/;
    var inverseRx = /^.*?:(\w+)$/;
    var classes = ['sibling', 'parent-child', 'back', 'forward', 'none'];

    function getParentUrl(url) {
        if (!url){
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

    function clearClasses() {
        console.log('clearClasses');
        for(var i = 0; i < classes.length; i += 1) {
            try {
                console.log('\tremoving', classes[i]);
                container.removeClass(classes[i]);
            } catch (e) {
                console.log('%cclearClasses failed', "color:#F00");
            }
        }
    }

    return {
        link: function () {
            var index = getIndex($state.current, $state.indexes, $stateParams), prevIndex = prevState && getIndex(prevState, $state.indexes, prevStateParams) || -1;
            var url = $state.current.url;
            if (index !== -1 && prevIndex !== -1) {
                sibling = true;
                if (index < prevIndex) {
                    console.log('sibling', index, prevIndex);
                    transition = 'back';
                } else {
                    transition = 'forward';
                }
            } else {
                sibling = false;
                if (prevState && getParentUrl(url) === prevState.url) {// child to parent back
                    console.log('to child');
                    transition = 'forward';
                } else if (url === getParentUrl(prevState && prevState.url)) {// child to parent back
                    console.log('to parent');
                    transition = 'back';
                } else {
                    console.log('otherwise');
                    transition = 'forward';
                }
            }
            prevState = $state.current;
            prevStateParams = require('extend')({}, $stateParams);
            if (!container) {
                container = angular.element(document.querySelector('.ui-view-container'));
            }
            container.addClass(sibling ? 'sibling' : 'parent-child');
            container.addClass(transition);
            setTimeout(clearClasses, 1000);
        }
    };


    // list of viewStates
    // if in list, and before current move right
    // otherwise move left

});