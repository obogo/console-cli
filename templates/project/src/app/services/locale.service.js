module.value('locale', require('locale'));
module.factory('LocaleService', function($rootScope, locale) {
    $rootScope.locale = locale;
    return require('localeService');
});