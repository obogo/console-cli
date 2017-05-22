/**
 * Handles animation events
 */
/* global angular, module, environment */
module.service('Animation', function () {

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

    function whichAnimationEvent(type) {
        var t,
            el = document.createElement("fakeelement");

        var animations = {
            "animation": ("animation" + type).toLowerCase(),
            "OAnimation": "oAnimation" + type,
            "MozAnimation": ("animation" + type).toLowerCase(),
            "WebkitAnimation": "webkitAnimation" + type
        };

        for (t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }

    this.animationStartEvent = whichAnimationEvent('Start');
    this.animationCancelEvent = whichAnimationEvent('Cancel');
    this.animationEndEvent = whichAnimationEvent('End');

    this.onStart = function (el, handler) {
        var that = this;
        var subscriber = getSubscriber(el, handler);
        if (subscriber) {
            return subscriber.unsubscribe;
        }

        el.addEventListener(that.animationStartEvent, handler);

        function unsubscribe() {
            removeSubscriber(el, handler);
            el.removeEventListener(that.animationStartEvent, handler);
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

        el.addEventListener(that.animationEndEvent, handler);

        function unsubscribe() {
            removeSubscriber(el, handler);
            el.removeEventListener(that.animationEndEvent, handler);
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

        el.addEventListener(that.animationCancelEvent, handler);

        function unsubscribe() {
            removeSubscriber(el, handler);
            el.removeEventListener(that.animationCancelEvent, handler);
        }

        addSubscriber(el, handler, unsubscribe);

        return unsubscribe;
    };
});