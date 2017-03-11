module.component('consoleHeader', {
    templateUrl: 'header',
    controller: function ($transitions, $state, Menu, $attrs) {
        var ctrl = this;
        ctrl.menu = Menu;

        $transitions.onStart({}, function (trans) {
            ctrl.state = trans.targetState().state().data || {};
            $attrs.$addClass('animated-2x slideInDown');
            setTimeout(function () {
                $attrs.$removeClass('animated-2x slideInDown');
            }, 500);
        });

        $transitions.onFinish({}, function (trans) {
            ctrl.state = trans.targetState().state().data || {};
        });
    }
});