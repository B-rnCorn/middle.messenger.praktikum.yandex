import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-information-edit-form.hbs';

export class ProfileInformationEditForm extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
