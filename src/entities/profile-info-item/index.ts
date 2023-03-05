import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-info-item.hbs';

export class ProfileInfoItem extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
