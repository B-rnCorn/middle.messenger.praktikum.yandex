import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-info-action.hbs';

export class ProfileInfoAction extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
