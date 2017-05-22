/**
 * Handles animation events
 */
/* global angular, module, environment */
module.service('Transition', function () {

    var subscribers = [];

    function getSubscriber(el, handler) {
        for (var i = 0; i < subscribers.length; i++) {
            if (subscribers[i].el === el && subscribers[i].handler === handler) {
                return subscribers[i];
            }
        }
    }

    function addSubscriber(el, handler, unsubscribe) {
        subscribers.push({
            el: el,
            handler: handler,
            unsubscribe: unsubscribe
        });
    }

    function removeSubscriber(el, handler) {
        for (var i = 0; i < subscribers.length; i++) {
            if (subscribers[i].el === el && subscribers[i].handler === handler) {
                return subscribers.splice(i, 1);
            }
        }
    }

    function whichTransitionEvent(type) {
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition': ('transition' + type).toLowerCase(),
            'OTransition': 'oTransition' + type,
            'MozTransition': ('transition' + type).toLowerCase(),
            'WebkitTransition': 'webkitTransition' + type
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    this.transitionStartEvent = whichTransitionEvent('Start');
    this.transitionCancelEvent = whichTransitionEvent('Cancel');
    this.transitionEndEvent = whichTransitionEvent('End');

    this.onStart = function (el, handler) {
        var that = this;
        var subscriber = getSubscriber(el, handler);
        if (subscriber) {
            return subscriber.unsubscribe;
        }

        el.addEventListener(that.transitionStartEvent, handler);

        function unsubscribe() {
            removeSubscriber(el, handler);
            el.removeEventListener(that.transitionStartEvent, handler);
        }

        addSubscriber(el, handler, unsubscribe);

        return unsubscribe;
    };

    this.onEnd = function (el, handler) {
        var that = this;
        var subscriber = getSubscriber(el, handler);
        if (subscriber) {
            return subscriber.unsubscribe;
        }

        el.addEventListener(that.transitionEndEvent, handler);

        function unsubscribe() {
            removeSubscriber(el, handler);
            el.removeEventListener(that.transitionEndEvent, handler);
        }

        addSubscriber(el, handler, unsubscribe);

        return unsubscribe;
    };

    this.onCancel = function (el, handler) {
        var that = this;
        var subscriber = getSubscriber(el, handler);
        if (subscriber) {
            return subscriber.unsubscribe;
        }

        el.addEventListener(that.transitionCancelEvent, handler);

        function unsubscribe() {
            removeSubscriber(el, handler);
            el.removeEventListener(that.transitionCancelEvent, handler);
        }

        addSubscriber(el, handler, unsubscribe);

        return unsubscribe;
    };
});