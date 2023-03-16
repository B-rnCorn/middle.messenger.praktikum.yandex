import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./button.hbs";
import {BlockEvents} from "~/app/core/types";

type ButtonProps = {
    tagName?: string;
    isNeedInternalId?: boolean;
    id?: string;
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        buttonText: string,
        buttonValidationText?: string,
        buttonAlternativeNavigationText?: string,
        buttonAlternativeNavigationRoute?: string,
        buttonType: string,
        onClickAction?: string,
    }
}
export class Button extends Block<ButtonProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
