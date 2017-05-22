/* global angular, module, environment */
module.component('consoleHeader', {
    templateUrl: 'header',
    controller: function ($transitions, $timeout, $state, $attrs, Menu, Toast, sso) {
        var ctrl = this;
        ctrl.menu = Menu;
        ctrl.user = sso.user;

        ctrl.toggleMenu = function () {
            if (!ctrl.hideMenu) {
                ctrl.menu.toggle()
            }
        };

        $timeout(function () {
            try {
                if ($state.current.data.hideMenu) {
                    $attrs.$addClass('menu-hide');
                } else {
                    $attrs.$removeClass('menu-hide');
                }
            } catch (e) {

            }
        });

        $transitions.onStart({}, function (trans) {
            ctrl.state = trans.targetState().state().data || {};
            if (ctrl.state.hideMenu) {
                $attrs.$addClass('menu-hide');
            } else {
                $attrs.$removeClass('menu-hide');
            }

            // $attrs.$addClass('animated-2x slideInDown');
            // setTimeout(function () {
            //     $attrs.$removeClass('animated-2x slideInDown');
            // }, 500);
        });

        $transitions.onFinish({}, function (trans) {
            ctrl.state = trans.targetState().state().data || {};
        });
    }
});