import * as images from "~/images/image-urls";
import {ProfileInformation} from "~/widgets/profile-information";
import {ProfileInfoItem} from "~/entities/profile-info-item";
import {ProfileInfoAction} from "~/entities/profile-info-action";
import {NavigateBack} from "~/features/navigate-back";
import {ProfileProps} from "~/pages/profile";

export const profileConfig: ProfileProps = {
    blockPropsAndChildren: {
        profileInformation: new ProfileInformation({
            blockPropsAndChildren: {
                nameInChat: 'Имя в чате',
                imageUrl: images.chatImageUrl.toString(),
                profileInfoItems: [
                    new ProfileInfoItem({
                        blockPropsAndChildren: {
                            itemName: 'Почта',
                            itemValue: 'example@mailbox.com',
                        }
                    }),
                    new ProfileInfoItem({
                        blockPropsAndChildren: {
                            itemName: 'Логин',
                            itemValue: 'examplelogin',
                        }
                    }),
                    new ProfileInfoItem({
                        blockPropsAndChildren: {
                            itemName: 'Имя',
                            itemValue: 'Имя',
                        }
                    }),
                    new ProfileInfoItem({
                        blockPropsAndChildren: {
                            itemName: 'Фамилия',
                            itemValue: 'Фамилия',
                        }
                    }),
                    new ProfileInfoItem({
                        blockPropsAndChildren: {
                            itemName: 'Имя в чате',
                            itemValue: 'Имя в чате',
                        }
                    }),
                    new ProfileInfoItem({
                        blockPropsAndChildren: {
                            itemName: 'Телефон',
                            itemValue: '+7 (909) 967 30 30',
                        }
                    }),
                ],
                profileInfoActions: [
                    new ProfileInfoAction({
                        blockPropsAndChildren: {
                            actionName: 'Изменить данные',
                            route: 'ProfileEdit'
                        }
                    }),
                    new ProfileInfoAction({
                        blockPropsAndChildren: {
                            actionName: 'Изменить пароль',
                        }
                    }),
                    new ProfileInfoAction({
                        blockPropsAndChildren: {
                            actionName: 'Выйти',
                            route: 'Login'
                        }
                    })
                ]
            }
        }),
        navigateBack: new NavigateBack({
            blockPropsAndChildren: {}
        }),
    }
}
