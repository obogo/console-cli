// http://sinonjs.org/releases/v2.1.0/fake-xhr-and-server/

// mockServer.stub('get', /\/check/, {
//     accessToken: 'ACCESS_TOKEN_HERE',
//     user: {
//         profile: {
//             firstName: 'John',
//             lastName: 'Smith',
//             displayName: "John Smith"
//         }
//     }
// });

// -- OR IF YOU NEED TO DO SOMETHING... -- //

mockServer.stub('get', /\/check/, function (xhr, id) {
    var responseCode = 200;
    var responseHeaders = {"Content-Type": "application/json"};
    var responseBody = JSON.stringify({
        accessToken: 'ACCESS_TOKEN_HERE',
        user: {
            profile: {
                firstName: 'John',
                lastName: 'Smith',
                displayName: "John Smith"
            }
        }
    });
    xhr.respond(responseCode, responseHeaders, responseBody);
});
