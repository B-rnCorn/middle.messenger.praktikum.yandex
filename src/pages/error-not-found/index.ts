import {Block} from '~/app/core/Block';
import * as template from './ui/error-not-found.hbs';

export class ErrorNotFound extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
