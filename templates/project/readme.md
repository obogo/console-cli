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
    
