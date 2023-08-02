import {Block} from "~/app/core/Block";
// @ts-expect-error
import template from "./ui/login.hbs";
import {BlockPropsAndChildren} from "~/app/core/types";

export type LoginPageProps = {
    tagName?: string,
    blockPropsAndChildren: BlockPropsAndChildren,
}

export class LoginPage extends Block<LoginPageProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
