import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/navigate-back.hbs';
import {BlockEvents, BlockPropsAndChildren} from "~/app/core/types";

export type NavigateBackProps = {
    blockEvents: BlockEvents;
    blockPropsAndChildren: BlockPropsAndChildren;
}
export class NavigateBack extends Block<NavigateBackProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
