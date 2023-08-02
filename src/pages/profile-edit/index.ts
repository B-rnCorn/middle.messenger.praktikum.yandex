import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/profile-edit.hbs';
import {ProfileInformationEditForm} from "~/widgets/profile-information-edit-form";
import {NavigateBack} from "~/features/navigate-back";

export type ProfileEditProps = {
    blockPropsAndChildren: {
        profileInformationEditForm: ProfileInformationEditForm,
        navigateBack: NavigateBack,
    }
}

export class ProfileEdit extends Block<ProfileEditProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
