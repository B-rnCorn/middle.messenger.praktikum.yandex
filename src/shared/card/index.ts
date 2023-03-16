import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./card.hbs";

export type CardProps = {
    tagName?: string,
    blockPropsAndChildren: {
        header: string,
        body: Record<string, any>
    },
}
export class Card extends Block<CardProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
