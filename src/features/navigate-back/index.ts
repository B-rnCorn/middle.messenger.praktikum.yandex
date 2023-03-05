import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/navigate-back.hbs';

export class NavigateBack extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
