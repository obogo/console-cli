(function () {
    window.environment = {
        isNative: true, // phonegap, electron (native) vs. a browser (not native)
        authService: {
            baseUrl: 'https://remote.authservice.url/api',
            params: {  // You can add query params that will be passed as part of login
                // Here is an example
                // apiKey: "12345"
            },
            useRedirect: false,
            redirect: {
                url: "https://remote.authservice.url"
            }
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