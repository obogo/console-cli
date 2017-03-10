module.component('consoleMenu', {
    templateUrl: 'menu',
    controller: function (Menu, $transitions) {
        var ctrl = this;
        ctrl.menu = Menu;

        $transitions.onCreate({ }, function(trans) {
            ctrl.state = trans.targetState().state().data;
            Menu.close();
        });
    }
});