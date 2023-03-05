import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/error-server.hbs';

export class ErrorServer extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
