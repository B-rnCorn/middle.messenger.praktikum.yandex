import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-edit.hbs';

export class ProfileEdit extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
