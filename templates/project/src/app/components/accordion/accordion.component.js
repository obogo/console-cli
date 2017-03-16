module.component('consoleAccordion', {
    templateUrl: 'accordion',
    transclude: true,
    bindings: {
        accordionBody: '@?',
        // isOpen: "=?",
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
        var collapsedClass = 'is-collapsed';
        var defaultBodySelector = '.console-accordion-body';
        var $accordionBody;

        ctrl.opened = false;

        ctrl.isOpen = function () {
            return !$accordionBody.hasClass(collapsedClass);
        };

        ctrl.toggle = function () {
            if (ctrl.isOpen()) {
                this.close();
            } else {
                this.open();
            }
        };

        ctrl.open = function () {
            if (!ctrl.isOpen()) {
                ctrl.opened = true;
                var rect;
                // this quickly removes the class that hides the body, gets the size and then restores it again
                angular.element($accordionBody.removeClass(collapsedClass));
                rect = $accordionBody[0].getBoundingClientRect();
                angular.element($accordionBody).addClass(collapsedClass);

                // we need the timeout in order for the transition to occur
                setTimeout(function () {
                    $accordionBody[0].style['max-height'] = rect.height + 'px';
                    angular.element($accordionBody.removeClass(collapsedClass));
                });

                if (!ctrl.accordionBody) {
                    ctrl.accordionBody = $accordionBody;

                    $accordionBody.on(transitionEvent, function () {
                        $accordionBody[0].style['max-height'] = '';
                    });
                }
            }
        };

        ctrl.close = function () {
            if (ctrl.isOpen()) {
                ctrl.opened = false;
                // reset the height (was changed on transition end)
                var rect = $accordionBody[0].getBoundingClientRect();
                $accordionBody[0].style['max-height'] = rect.height + 'px';

                // we need the timeout in order for the transition to occur
                setTimeout(function () {
                    $accordionBody[0].style['max-height'] = '';
                    angular.element($accordionBody).addClass(collapsedClass);
                });
            }
        };

        ctrl.$postLink = function () {
            if (!ctrl.accordionBody) {
                ctrl.accordionBody = defaultBodySelector;
            }

            $accordionBody = $element.find(ctrl.accordionBody);
            $accordionBody.addClass('transition');

            ctrl.opened = ctrl.isOpen();

            if (ctrl.onReady) {
                ctrl.onReady({
                    accordion: ctrl
                });
            }
        };

        ctrl.$onDestroy = function () {

        };

        ctrl.$onChanges = function (changesObj) {
            // console.log('#changes', changesObj);
        };
    }

});