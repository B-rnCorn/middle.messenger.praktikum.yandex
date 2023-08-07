import {Block} from "~/app/core/Block";
import {Route} from "~/app/core/router/Route";
import {BlockProps} from "~/app/core/types";
import {Routes} from "~/app/core/router/Routes";
import sessionStorageController from "~/app/core/controllers/SessionStorageController";

const PATH_KEY = 'PATH';

export class Router {

    private routes: Route<any>[];
    private history: History;
    private currentRoute: Route<any> | null;
    constructor() {
        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
    }

    use<BlockClass extends Block<BlockProps>>(pathname: Routes, block: BlockClass) {
        const route = new Route<BlockProps>(pathname, block);
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            //@ts-expect-error
            if (event.currentTarget.location.pathname) {
                //@ts-expect-error
                this._onRoute(event.currentTarget.location.pathname);
            } else {
                //@ts-expect-error
                this._onRoute(sessionStorageController.get(PATH_KEY) ?? Routes.Chat);
            }
        };

        this._onRoute(window.location.pathname as Routes);
    }

    _onRoute(pathname: Routes) {
        const route = this.getRoute(pathname);

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        if (route) {
            this.currentRoute = route;
            sessionStorageController.set(PATH_KEY, pathname);
            route.render();
        }
    }

    go(pathname: Routes) {
        this.history.pushState({}, "", pathname);
        console.log('NAVIGATE TO', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: Routes): Route<any> | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

export namespace Router {

}
