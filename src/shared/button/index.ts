import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./button.hbs";

export class Button extends Block {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
