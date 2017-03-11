module.factory('authGuard', function AuthGuardProvider() {
    return function ($q, $state, AppConfig) {
        var deferred = $q.defer();
        if (AppConfig.sso.accessToken) {
            deferred.resolve();
        } else {
            deferred.reject();
            if (AppConfig.isPhoneGap) {
                $state.go('landing');
            } else {
                location.href = AppConfig.hive.redirectUrl.supplant({
                    provider: AppConfig.hive.provider,
                    product: AppConfig.hive.product
                });
            }
        }
        return deferred.promise;
    }
});