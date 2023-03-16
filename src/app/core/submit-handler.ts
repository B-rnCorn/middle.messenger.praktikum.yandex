export const submitHandler = (function () {
    const subscribe = function (channel: string, fn: () => any, context: any) {
        if (!(submitHandler.channels as any)[channel]) {
            (submitHandler.channels as any)[channel] = [];
        }
        (submitHandler.channels as any)[channel].push({context: context, callback: fn});
        return context;
    };

    const publish = function (channel: string) {
        if ((!submitHandler.channels as any)[channel]) return false;
        const args = Array.prototype.slice.call(arguments, 1);
        for (let i = 0, l = (submitHandler.channels as any)[channel].length; i < l; i++) {
            const subscription = (submitHandler.channels as any)[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };
    return {
        channels: {},
        publish: publish,
        subscribe: subscribe,
    };
})();
