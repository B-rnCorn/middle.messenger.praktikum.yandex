import {Block} from "~/app/core/Block";
import {Router} from "~/app/core/router";

export default function withRouter(Component: typeof Block<any>) {
    return class WithRouter extends Component {
        constructor(props: Record<string, any>) {
            super({...props, router: Router.getInstance()});
        }
    };
}

export interface PropsWithRouter {
    router: typeof Router;
}
