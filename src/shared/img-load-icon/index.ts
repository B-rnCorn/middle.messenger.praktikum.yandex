import {Block} from "~/app/core/Block";
import template from "./img-load-icon.hbs";
import {BlockEvents} from "~/app/core/types";

type ImgLoadIconProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
        imageUrl: string;
    }
}
export class ImgLoadIcon extends Block<ImgLoadIconProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
