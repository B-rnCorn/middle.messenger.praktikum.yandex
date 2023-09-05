import {Block} from "~/app/core/Block";
import template from "./button.hbs";
import {BlockEvents} from "~/app/core/types";
import {AltNav} from "~/shared/button/alt-nav";

type ButtonProps = {
    tagName?: string;
    isNeedInternalId?: boolean;
    id?: string;
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        buttonText: string,
        buttonValidationText?: string,
        altNav?: AltNav,
        buttonType: string,
        onClickAction?: string,
    }
}
export class Button extends Block<ButtonProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
