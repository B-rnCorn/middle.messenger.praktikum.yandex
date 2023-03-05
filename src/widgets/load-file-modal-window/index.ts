import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/load-file-modal-window.hbs';

export class LoadFileModalWindow extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
