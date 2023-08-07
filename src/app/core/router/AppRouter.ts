import Router from "~/app/core/router/Router";

export class AppRouter {
    private static instance: Router;
    static getInstance() {
        if (!AppRouter.instance) {
            AppRouter.instance = new Router();
        }
        return AppRouter.instance;
    }
}
