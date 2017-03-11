(function() {
    window.appConfig = {
        locale: {
            localStorageKey: 'language',
            basePath: 'languages',
            defaultLocale: 'en-US',
            fileExtension: '.lang.json',
            persistLanguage: true,
            supported: ['en-US', 'es-SP'],
            fallbacks: {'en': 'en-US', 'sp': 'es-SP'}
        }
    };
})();