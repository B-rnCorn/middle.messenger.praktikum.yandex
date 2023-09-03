export default class EventBus {
    private readonly listeners: Record<string, Array<(...args: any) => void>>;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: () => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: () => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]) {
        /*if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }*/
        console.log('TEST',event, args, this.listeners, this.listeners[event]);

        (this.listeners[event] || []).forEach((listener) => {
            listener(...args);
        });
    }
}
