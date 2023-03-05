import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-information.hbs';

export class ProfileInformation extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
