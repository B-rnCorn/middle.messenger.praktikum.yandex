import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./card.hbs";

export class Card extends Block {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
