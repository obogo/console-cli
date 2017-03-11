module.component('consoleAccount', {
    templateUrl: 'account',
    controller: function (sso) {
        var ctrl = this;
        ctrl.user = sso.user;
    }
});