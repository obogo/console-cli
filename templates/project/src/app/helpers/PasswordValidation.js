/* global angular, module, environment */
module.service('PasswordValidation', function() {
    var api = this;

    function PasswordCheckResults() {
        this.checked = true;
        this.pass = false;
        this.min = false;
        this.max = false;
        this.requirements = 0;
        this.hasUpper = false;
        this.hasLower = false;
        this.hasNumber = false;
    }

    function PasswordCheckOptions() {
        this.min = 8;
        this.max = 100;
        this.minRequires = 3;
    }

    api.check = function(password) {
        var options = new PasswordCheckOptions();
        var results = new PasswordCheckResults(password);
        var pass = true;
        var requirementCount = 0;

        if (password.length >= options.min) {
            results.min = true;
        } else {
            pass = false;
        }

        if (password.length <= options.max) {
            results.max = true;
        } else {
            pass = false;
        }

        if (password.match(/[A-Z]/)) {
            results.hasUpper = true;
            requirementCount++;
        }

        if (password.match(/[a-z]/)) {
            results.hasLower = true;
            requirementCount++;
        }

        if (password.match(/[0-9]/)) {
            results.hasNumber = true;
            requirementCount++;
        }

        if (password.match(/\W/)) {
            results.hasNonAlpha = true;
            requirementCount++;
        }

        results.requirements = requirementCount;

        if (requirementCount < options.minRequires) {
            pass = false;
        }

        results.pass = pass;

        return results;
    };
});