import {Block} from '~/app/core/Block';
import template from './ui/profile-edit.hbs';
import {ProfileInformationEditForm} from "~/widgets/profile-information-edit-form";
import {NavigateBack} from "~/features/navigate-back";
import {LoadFileModalWindow} from "~/widgets/load-file-modal-window";

export type ProfileEditProps = {
    blockPropsAndChildren: {
        profileInformationEditForm: ProfileInformationEditForm,
        navigateBack: NavigateBack,
        loadFileModalWindow: LoadFileModalWindow,
    }
}

export class ProfileEdit extends Block<ProfileEditProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
