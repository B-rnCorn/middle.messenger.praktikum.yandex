class SessionStorageController {
    constructor() {
    }

    set(key: string, data: string) {
        window.sessionStorage.setItem(key, data);
    };

    delete(key: string,) {
        window.sessionStorage.removeItem(key);
    };

    get(key: string,) {
        return sessionStorage.getItem(key);
    }
}

export default new SessionStorageController();
