module.component('consoleAlert', {
    templateUrl: 'alert',
    controller: function (Alert) {
        var ctrl = this;
        ctrl.alert = Alert;
    }
});