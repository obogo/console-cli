module.factory('authGuard', function AuthGuardProvider() {
    var supplant = require('supplant');
    return function ($q, $state, environment) {
        var deferred = $q.defer();
        if (environment.sso.accessToken) {
            deferred.resolve();
        } else {
            deferred.reject();
            if (environment.authService.useRedirect) {
                location.href = environment.authService.redirectUrl;
            } else {
                $state.go('landing');
            }
        }
        return deferred.promise;
    }
});