import {Block} from '~/app/core/Block';
import template from './ui/profile.hbs';
import {NavigateBack} from "~/features/navigate-back";
import {ProfileInformation} from "~/widgets/profile-information";

export type ProfilePageProps = {
    blockPropsAndChildren: {
        profileInformation: ProfileInformation,
        navigateBack: NavigateBack,
    },
}

class ProfilePage extends Block<ProfilePageProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}

export default ProfilePage;
