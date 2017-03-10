module.component('consoleHeader', {
    templateUrl: 'header',
    controller: function ($transitions, $state, Menu) {
        var ctrl = this;
        ctrl.menu = Menu;

        $transitions.onStart({ }, function(trans) {
            ctrl.state = trans.targetState().state().data;
        });
    }
});