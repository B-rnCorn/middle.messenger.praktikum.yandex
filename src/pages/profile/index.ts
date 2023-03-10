import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile.hbs';
import {NavigateBack} from "~/features/navigate-back";
import {ProfileInformation} from "~/widgets/profile-information";

export type ProfileProps = {
    blockPropsAndChildren: {
        profileInformation: ProfileInformation,
        navigateBack: NavigateBack,
    },
}

export class Profile extends Block<ProfileProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
