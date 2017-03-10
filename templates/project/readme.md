Console CLI
===

### Commands

#### Creating a new project

	console init [ProductName] [PathToCreateProject]

	Usage:
	console init "My Product's Name" .

#### Generating console elements

Generating an element is the same for elements by changing some options:

	console g [ComponentType] [ComponentName]
	
	Usage:
	console g page about
	console g component footer
	console g dialog personEdit
	console g model org
	console g pipe timeAgo
	console g service orgs

### Routing

Console uses ui-router to manage its routing. The API reference can be found here:
https://ui-router.github.io/ng1/docs/latest/index.html

We are using UI-Router 1.x

https://ui-router.github.io/guide/ng1/migrate-to-1_0

### Prebuilt Components

#### Creating a dialog

    Dialog.open({
        title: "Schedule",
        component: "console-time-dialog",
        footer: {
           cancelLabel: 'Cancel',
           okLabel: 'Save'
        },
        locals: {
            time: new Date()
        },
        close: function(save) {
            if(save) {
                // save
            } else {
                // cancel    
            }
        }
    });
    
#### Localization

Usage:

    <p>{{locale.myString}}</p>
    
Supplant Usage:

    // in localization
    "myString": "Hello, {name}"

    <p>{{locale('myString', {name:'Fred'})}}</p>
    // will output "Hello, Fred".
    
How to load different language:

    LocaleService.load('en-US').then(function() {
        console.log(LocaleService.language);
    });
    
How to change the defaults.

    var module = angular.module('app');
    module
        .value('localeConf', {
            localStorageKey: 'language',
            basePath: 'languages',
            defaultLocale: 'en-US',
            fileExtension: '.lang.json',
            persistLanguage: true,
            supported: ['en-US', 'es-SP'],
            fallbacks: {'en': 'en-US', 'sp': 'es-SP'}
        });
        