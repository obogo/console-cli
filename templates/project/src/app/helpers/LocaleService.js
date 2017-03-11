/* global define, angular, obogo */
define('localeService', ['defer', 'http', 'locale'], function (defer, http, locale) {

    function LocaleService() {
        var self = this;
        var loaded;

        function config(opts) {
            locale.$config = opts || {};
            return self;
        }

        function load(lang) {
            var deferred = defer();
            if (lang && locale.$lang !== lang || !loaded) {
                loaded = true;
                locale.$lang = lang;
                http.get({
                    url:locale.$url,
                    success:function (response) {
                        locale(response.data);
                        deferred.resolve(locale);
                    },
                    error: function (e) {
                        deferred.reject("Locales failed to load for " + locale.$lang);
                    }
                });
            } else {
                deferred.resolve(locale);
            }
            return deferred.promise;
        }

        Object.defineProperty(this, 'language', {
            get: function () {
                return locale.$lang;
            }
        });
        this.load = load;// do it this way because it returns a promise for when it is loaded.
        this.config = config;
        // $rootScope.locale = locale;
    }

    return new LocaleService();
});