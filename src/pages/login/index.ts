import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./ui/login.hbs";

export class LoginPage extends Block {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
