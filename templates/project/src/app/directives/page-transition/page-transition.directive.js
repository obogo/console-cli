module.directive('pageTransition', function ($state) {
    var prevState;
    var lastClass = '';
    var transition = '';
    return {
        link: function () {
            transition = prevState && prevState.data && prevState.data.transTo && prevState.data.transTo[$state.current.name] || '';
            lastClass = transition;
            prevState = $state.current;

            var all = document.querySelectorAll('[page-transition]');
            for (var i = 0; i < all.length; i++) {
                all[i].className = transition || 'anim-swap';
            }
        }
    };
});