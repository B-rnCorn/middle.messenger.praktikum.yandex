import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-information.hbs';
import {ProfileInfoItem} from "~/entities/profile-info-item";
import {ProfileInfoAction} from "~/entities/profile-info-action";

export type ProfileInformationProps = {
    blockPropsAndChildren: {
        nameInChat: string,
        imageUrl: string,
        profileInfoItems: ProfileInfoItem[],
        profileInfoActions: ProfileInfoAction[],
    }
}

export class ProfileInformation extends Block<ProfileInformationProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
