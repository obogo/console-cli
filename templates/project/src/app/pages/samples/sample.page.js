module.component('samplePage', {
    templateUrl: 'sample.page',
    controller: function ($stateParams, $state, locale) {
        var ctrl = this;
        var form = {};

        $state.indexes = ['1', '2', '3', '4'];

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

        ctrl.locale = locale;

        ctrl.form = form;

        ctrl.toggleCheck = function () {
            form.isChecked = !form.isChecked;
        };

        ctrl.cancel = function () {

        };

        ctrl.save = function () {

        };

        ctrl.prev = function() {
            var id = parseInt($stateParams.id, 10) - 1;
            console.log('#prev', id);
            $state.go('sample', {id: id});
        };

        ctrl.next = function() {
            var id = parseInt($stateParams.id, 10) + 1;
            console.log('#next', id);
            $state.go('sample', {id: id});
        };

        ctrl.getAccordion = function(accordion) {
            return accordion;
        };

        ctrl.setAccordionName = function(name, accordion) {
            ctrl[name] = accordion;
        };
    }
});