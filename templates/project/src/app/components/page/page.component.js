module.directive('pageTransition', function ($state) {
    var prevState;
    var lastClass = '';
    var transition = '';
    return {
        restrict: 'E',
        link: function ($scope, $el) {
            // Component
            transition = prevState && prevState.data && prevState.data.transTo && prevState.data.transTo[$state.current.name] || '';
            lastClass = transition;
            prevState = $state.current;
            // there is always two.
            var all = document.querySelectorAll('ui-view page-transition');
            all[0].className = transition || 'anim-swap';
            all[1].className = transition || 'anim-swap';
        }
    };
});