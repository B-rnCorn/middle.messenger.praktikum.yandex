import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/error-not-found.hbs';

export class ErrorNotFound extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
