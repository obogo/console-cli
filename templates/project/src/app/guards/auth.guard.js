module.factory('authGuard', function AuthGuardProvider() {
    var supplant = require('supplant');
    return function ($q, $state, AppConfig) {
        var deferred = $q.defer();
        if (AppConfig.sso.accessToken) {
            deferred.resolve();
        } else {
            deferred.reject();
            if (AppConfig.isNative) {
                $state.go('landing');
            } else {
                location.href = supplant(AppConfig.hive.redirectUrl, {
                    provider: AppConfig.hive.provider,
                    product: AppConfig.hive.product,
                    redirect: location.href
                });
            }
        }
        return deferred.promise;
    }
});