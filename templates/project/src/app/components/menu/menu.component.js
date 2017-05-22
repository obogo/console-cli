/* global angular, module, environment */
module.component('consoleMenu', {
    templateUrl: 'menu',
    controller: function (Menu, $timeout, $state, $transitions, $attrs) {
        var ctrl = this;
        ctrl.menu = Menu;

        // hide first to prevent flicker
        $attrs.$addClass('menu-hide');

        $timeout(function () {
            if ($state.current.data && $state.current.data.hideMenu) {
                $attrs.$addClass('menu-hide');
            } else {
                $attrs.$removeClass('menu-hide');
            }
        });

        $transitions.onCreate({}, function (trans) {
            ctrl.state = trans.targetState().state().data || {};
            if (ctrl.state.hideMenu) {
                $attrs.$addClass('menu-hide');
            } else {
                $attrs.$removeClass('menu-hide');
            }
            Menu.close();
        });
    }
});