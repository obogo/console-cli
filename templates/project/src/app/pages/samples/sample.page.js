module.controller('SampleCtrl', function ($scope, $stateParams) {
    var form = {};

    form.input = 'Input value';

    form.textarea = 'Textarea value';

    form.dropdownOptions = [
        {label: 'Option 1', value: 'option-1'},
        {label: 'Option 2', value: 'option-2'},
        {label: 'Option 3', value: 'option-3'},
        {label: 'Option 4', value: 'option-4'}
    ];

    form.isChecked = true;

    form.list = [
        {id: 1, firstName: "Rob", lastName: "Taylor", email: "rob.taylor@obogo.io"},
        {id: 2, firstName: "Wes", lastName: "Jones", email: "wes.jones@obogo.io"},
        {id: 3, firstName: "John", lastName: "Smith", email: "john.smith@obogo.io"},
        {id: 4, firstName: "Jane", lastName: "Doe", email: "jane.doe@obogo.io"}
    ];

    $scope.form = form;

    $scope.toggleCheck = function () {
        form.isChecked = !form.isChecked;
    };

    $scope.cancel = function () {

    };

    $scope.save = function () {

    };
});