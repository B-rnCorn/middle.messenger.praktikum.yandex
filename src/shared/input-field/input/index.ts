import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./input.hbs";

export class Input extends Block {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
