(function () {
    window.mockServer = sinon.fakeServer.create();

    // https://gist.github.com/jonnyreeves/d8ebad4aaaa7d9c7ae15
    var requestUrisOrRegexes = [];

    function stubXhrRequest(method, uriOrRegex, responseObject) {
        // Store the uriOrRegex value so the FakeXHR filter can indicate this request
        // should be faked.
        requestUrisOrRegexes.push(uriOrRegex);

        var responseCode = 200;
        var responseHeaders = {"Content-Type": "application/json"};
        var responseBody = JSON.stringify(responseObject);

        mockServer.respondWith(method, uriOrRegex,
            typeof responseObject === 'function' ? responseObject : [responseCode, responseHeaders, responseBody]
        );
    }

    mockServer.autoRespond = true;
    mockServer.xhr.useFilters = true;
    mockServer.xhr.addFilter(function (method, uri) {
        var matched = false;

        // Deal with the fact `this.stubRequest` accepts both a string and a regex.
        function isMatch(matcher) {
            return (typeof matcher === "string") ? matcher === uri : matcher.exec(uri) !== null;
        }

        // Check all matchers to see if one matches the incoming URI.
        for (var i = 0; i < requestUrisOrRegexes.length; i++) {
            matched = isMatch(requestUrisOrRegexes[i]);
            if (matched) break;
        }

        // Sinon FakeXHR filters need to return `false` if the request should be stubbed and
        // `true` if it should be allowed to pass through.
        return !matched;
    });

    mockServer.stub = stubXhrRequest;
})();