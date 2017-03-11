(function () {
    window.appConfig = {
        hive: {
            baseUrl: 'http://localhost:5010/v1',
            product: "579e2b3b5339c2768234a699",
            provider: "579e2b3b5339c2768234a626",
            redirectUrl: 'http://localhost:5010/login?provider={provider}&product={product}&redirect={redirect}'
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