/* global define, angular, obogo */
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


define('LocaleService', ["defer", 'http', 'extend'], function ($q, $http, $rootScope, locale, localeConf) {

    function LocaleService() {

    }

    LocaleService.prototype.load = function(options) {
        // {
        //     localStorageKey: 'language',
        //     basePath: 'languages',
        //     defaultLocale: 'en-US',
        //     fileExtension: '.lang.json',
        //     persistLanguage: true,
        //     supported: ['en-US', 'es-SP'],
        //     fallbacks: {'en':'en-US','sp':'es-SP'}
        // }
    };

    return new LocaleService();

    // var loaded;
    // function load(lang) {
    //     var deferred = $q.defer();
    //     if (lang && locale.$lang !== lang || !loaded) {
    //         loaded = true;
    //         locale.$config = localeConf;
    //         locale.$lang = lang;
    //         $http.get(locale.$url)
    //             .then(function (response) {
    //                 locale(response.data);
    //                 deferred.resolve(locale);
    //             }, function(e) {
    //                 console.warn("Locales failed to load");
    //             });
    //     } else {
    //         deferred.resolve(locale);
    //     }
    //     return deferred.promise;
    // }
    //
    // var api = {
    //     load: load // do it this way because it returns a promise for when it is loaded.
    // };
    // Object.defineProperty(api, 'language', {
    //     get: function() { return locale.$lang; },
    // });
    // load();
    // $rootScope.locale = locale;
    // return api;
});