import {Block} from "~/app/core/Block";
import template from "./input.hbs";
import {BlockEvents} from "~/app/core/types";

type InputProps = {
    tagName?: string;
    isNeedInternalId?: boolean;
    id?: string;
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        inputId: string,
        inputName: string,
        inputStatus: string,
        inputValue: string,
        inputType: string,
    }
}

export class Input extends Block<InputProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
