import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/profile.hbs';
import {NavigateBack} from "~/features/navigate-back";
import {ProfileInformation} from "~/widgets/profile-information";
import withControllers from "~/app/core/providers/withControllers";
import AuthController from "~/app/core/controllers/AuthController";

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

export default withControllers(ProfilePage, {auth: AuthController});
