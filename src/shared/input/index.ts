import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./input.hbs";
import {BlockEvents} from "~/app/core/types";

type InputProps = {
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        inputId: string,
        inputName: string,
        inputStyleCLass: string,
        inputValue: string,
        inputType: string,
    }
}

export class Input extends Block<InputProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
