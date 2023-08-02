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

    submitHandler: typeof submitHandler;

    protected init() {
        super.init();

        this.submitHandler = submitHandler;

        this.submitHandler.subscribe('NavigateToProfile', this.componentForceUpdate, this);
    }
    protected render(): DocumentFragment {
        const userInfo = store.getState().user;

        if (userInfo) {

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
        }

        return this.compile(template, this.blockProps);
    }
}
