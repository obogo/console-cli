module.component('consoleMenu', {
    templateUrl: 'menu',
    controller: function (Menu, $transitions, $attrs) {
        var ctrl = this;
        ctrl.menu = Menu;

        $transitions.onCreate({ }, function(trans) {
            ctrl.state = trans.targetState().state().data || {};
            if(ctrl.state.hideMenu) {
                $attrs.$addClass('menu-hide');
            } else {
                $attrs.$removeClass('menu-hide');
            }
            Menu.close();
        });
    }
});