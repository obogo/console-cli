/* global angular, obogo */
module
    .value('locale', require('locale'))
    .value('localeConf', {
        localStorageKey: 'language',
        basePath: 'languages',
        defaultLocale: 'en-US',
        fileExtension: '.lang.json',
        persistLanguage: true,
        supported: ['en-US', 'es-SP'],
        fallbacks: {'en':'en-US','sp':'es-SP'}
    });
module.factory('LocaleService', function ($q, $http, $rootScope, locale, localeConf) {
    var language;
    function load(lang) {
        var deferred = $q.defer();
        if (!language || lang !== language) {
            locale.$config = localeConf;
            locale.$lang = lang;
            $http.get(locale.$url)
                .then(function (response) {
                    locale(response.data);
                    deferred.resolve(locale);
                }, function(e) {
                    console.warn("Locales failed to load");
                });
        } else {
            deferred.resolve(locale);
        }
        return deferred.promise;
    }

    var api = {
        load: load // do it this way because it returns a promise for when it is loaded.
    };
    Object.defineProperty(api, 'language', {
        get: function() { return language; },
    });
    load();
    $rootScope.locale = locale;
    return api;
});