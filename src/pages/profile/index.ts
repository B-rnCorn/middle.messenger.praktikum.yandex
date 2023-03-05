import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile.hbs';

export class Profile extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
