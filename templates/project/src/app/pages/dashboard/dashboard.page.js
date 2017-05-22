module.component('dashboardPage', {
    templateUrl: 'dashboard.page',
    controller: function (Dialog, Menu, Alert, Toast) {
        var ctrl = this;
        ctrl.menu = Menu;

        ctrl.openDialog = function() {
            Dialog.open({
                title: "Sample",
                footer: {
                    cancelLabel: 'Cancel',
                    okLabel: 'Save'
                },
                component: "console-sample-dialog",
                locals: {
                    time: new Date()
                },
                close: function(save) {
                    if(save) {
                        // save
                    } else {
                        // cancel
                    }
                }
            });
        };

        ctrl.showAlert = function() {
            Alert.open({
                dismissible: true,
                message: 'Hello, world!'
            })
        };

        ctrl.toast = function() {
            Toast.show('Another message', {
                id: 'anotherMsg',
                icon: "android",
                // actionLabel: 'Action',
                // onAction: function () {
                //     $state.go('verifyEmail');
                // },
                // showClose: true,
                // hideDelay: 0
            });
        }
    }
});