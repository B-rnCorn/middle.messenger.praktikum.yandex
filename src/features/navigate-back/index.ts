import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/navigate-back.hbs';
import {BlockPropsAndChildren} from "~/app/core/types";

export type NavigateBackProps = {
    blockPropsAndChildren: BlockPropsAndChildren
}
export class NavigateBack extends Block<NavigateBackProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
