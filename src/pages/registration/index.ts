import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./ui/registration.hbs";

export class RegistrationPage extends Block {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
