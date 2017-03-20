module.component('consoleAccordion', {
    templateUrl: 'accordion',
    transclude: true,
    bindings: {
        accordionBody: '@?',
        // isOpen: "=?",
        opened: '=?',
        onReady: '&?',
        onOpen: '&?',
        onClose: '&?'
    },
    controllerAs: 'accordion',
    controller: function ($element) {

        function whichTransitionEvent() {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }

        var ctrl = this;
        var transitionEvent = whichTransitionEvent();
        var openClass = 'open';
        var defaultHeaderSelector = '.console-accordion-header';
        var defaultBodySelector = '.console-accordion-body';
        var $accordionHeader;
        var $accordionBody;

        ctrl.opened = false;

        ctrl.toggle = function () {
            if (ctrl.opened) {
                this.close();
            } else {
                this.open();
            }
        };

        ctrl.open = function (force) {
            if (!ctrl.opened || force) {
                ctrl.opened = true;
                var rect;
                $accordionHeader.addClass(openClass);

                // this quickly removes the class that hides the body, gets the size and then restores it again
                $accordionBody.addClass(openClass);
                rect = $accordionBody[0].getBoundingClientRect();
                $accordionBody.removeClass(openClass);

                // we need the timeout in order for the transition to occur
                setTimeout(function () {
                    $accordionBody[0].style['max-height'] = rect.height + 'px';
                    $accordionBody.addClass(openClass);
                });
            }
        };

        ctrl.close = function (force) {
            if (ctrl.opened || force) {
                ctrl.opened = false;

                $accordionHeader.removeClass(openClass);

                // reset the height (was changed on transition end)
                var rect = $accordionBody[0].getBoundingClientRect();
                $accordionBody[0].style['max-height'] = rect.height + 'px';

                // we need the timeout in order for the transition to occur
                setTimeout(function () {
                    $accordionBody[0].style['max-height'] = '';
                    $accordionBody.removeClass(openClass);
                });
            }
        };

        ctrl.$postLink = function () {
            setTimeout(function() {
                // Setup Header
                if (!ctrl.accordionHeader) {
                    ctrl.accordionHeader = defaultHeaderSelector;
                }
                $accordionHeader = angular.element($element[0].querySelector(ctrl.accordionHeader));
                $accordionHeader.addClass('transition');
                if(ctrl.opened) {
                    $accordionHeader.addClass('open');
                }

                // Setup Body
                if (!ctrl.accordionBody) {
                    ctrl.accordionBody = defaultBodySelector;
                }
                $accordionBody = angular.element($element[0].querySelector(ctrl.accordionBody));
                $accordionBody.addClass('transition');
                if(ctrl.opened) {
                    $accordionBody.addClass('open');
                }

                $accordionBody.on(transitionEvent, function () {
                    $accordionBody[0].style['max-height'] = '';
                });

                var isOpen = ctrl.opened;
                ctrl.close(true);
                if (isOpen) {
                    ctrl.open(true);
                }

                if (ctrl.onReady) {
                    ctrl.onReady({
                        accordion: ctrl
                    });
                }
            })
        };

        ctrl.$onDestroy = function () {

        };

        ctrl.$onChanges = function (changesObj) {
            // console.log('#changes', changesObj);
        };
    }

});