(function () {
    window.appConfig = {
        hive: {
            baseUrl: 'http://localhost:5010/v1'
        },
        services: {
            baseUrl: 'http://localhost/api',
            withCredentials: false,
            useGETPOSTOnly: false
        },
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