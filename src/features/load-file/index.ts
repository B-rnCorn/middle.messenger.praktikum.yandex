import {Block} from '~/app/core/Block';
import template from './ui/load-file.hbs';
import {Button} from "~/shared/button";
import {BlockEvents} from "~/app/core/types";
import {Input} from "~/shared/input";

export type LoadFileProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
        inputFieldLabel: string,
        inputFieldId: string,
        inputField: Input,
        submitButton: Button,
    }
}

export class LoadFile extends Block<LoadFileProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
