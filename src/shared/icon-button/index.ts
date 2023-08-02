import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./icon-button.hbs";
import {BlockEvents} from "~/app/core/types";

type IconButtonProps = {
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        altText: string,
        iconUrl: string,
        cssClassName: string,
    }
}

export class IconButton extends Block<IconButtonProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
