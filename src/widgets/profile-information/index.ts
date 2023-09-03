import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-information.hbs';
import {ProfileInfoItem} from "~/entities/profile-info-item";
import {ProfileInfoAction} from "~/entities/profile-info-action";
import store from "~/app/core/store/Store";
import {LOCALIZED_FIELD_NAMES, USER_FIELDS_NAMES} from "~/widgets/profile-information/constants";
import {submitHandler} from "~/app/core/SubmitHandler";

export type ProfileInformationProps = {
    blockPropsAndChildren: {
        nameInChat: string,
        imageUrl: string,
        profileInfoItems: ProfileInfoItem[],
        profileInfoActions: ProfileInfoAction[],
    }
}

export class ProfileInformation extends Block<ProfileInformationProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('NavigateToProfile', this.setChildAndProps, this);
        setTimeout(()=> submitHandler.publish('NavigateToProfile'), 1000);
    }
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    protected setChildAndProps () {
        const userInfo = store.getState().user;

        if (userInfo) {

            this.blockProps.imageUrl = userInfo.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + userInfo.avatar : 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png';
            //@ts-expect-error
            this.children.profileInfoItems =  Object.keys(userInfo).map((userDataKey) => {
                if (USER_FIELDS_NAMES.includes(userDataKey)) {
                    return new ProfileInfoItem({
                        blockPropsAndChildren: {
                            itemName: LOCALIZED_FIELD_NAMES[userDataKey],
                            //@ts-expect-error
                            itemValue: userInfo[userDataKey] ?? '',
                        }
                    });
                }
            })?.filter(item => item !== undefined) ?? [];

            this.componentForceUpdate();
        }
    }
}
