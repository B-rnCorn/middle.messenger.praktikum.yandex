import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./label.hbs";

type LabelProps = {
    blockPropsAndChildren: {
        inputId: string,
        text: string,
    }
}

export class Label extends Block<LabelProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
