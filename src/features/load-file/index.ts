import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/load-file.hbs';
import {Button} from "~/shared/button";

export type LoadFileProps = {
    blockPropsAndChildren: {
        inputFieldId: string,
        inputFieldName: string,
        inputFieldLabel: string,
        inputFieldType: string,
        submitButton: Button
    }
}

export class LoadFile extends Block<LoadFileProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
