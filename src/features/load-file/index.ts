import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/load-file.hbs';

export class LoadFile extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
