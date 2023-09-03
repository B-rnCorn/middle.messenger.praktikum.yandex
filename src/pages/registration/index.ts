import {Block} from "~/app/core/Block";
import template from "./ui/registration.hbs";
import {BlockPropsAndChildren} from "~/app/core/types";

export type RegistrationPageProps = {
    tagName?: string,
    blockPropsAndChildren: BlockPropsAndChildren,
}
export class RegistrationPage extends Block<RegistrationPageProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
