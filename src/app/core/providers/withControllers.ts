import {Block} from "~/app/core/Block";
import {BlockProps} from "~/app/core/types";

function withControllers(Component: typeof Block<BlockProps>, controllers: Record<string, any>) {
    return class WithControllers extends Component {
        constructor(props: Record<string, any>) {
            props.blockPropsAndChildren = {...props.blockPropsAndChildren, ...{controllers: controllers}};
            super({...props});
        }
    };
}

export default withControllers;
