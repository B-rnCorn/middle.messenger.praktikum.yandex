import * as images from "~/images/image-urls";
import {ProfileInformation} from "~/widgets/profile-information";
import {ProfileInfoAction} from "~/entities/profile-info-action";
import {NavigateBack} from "~/features/navigate-back";
import {ProfilePageProps} from "~/pages/profile";
import {Router, Routes} from "~/app/core/router";
import AuthController from "~/app/core/controllers/AuthController";
import {submitHandler} from "~/app/core/SubmitHandler";

export const profileConfig: ProfilePageProps = {
    blockPropsAndChildren: {
        profileInformation: new ProfileInformation({
            blockPropsAndChildren: {
                nameInChat: 'Имя в чате',
                imageUrl: images.chatImageUrl.toString(),
                profileInfoItems: [],
                profileInfoActions: [
                    new ProfileInfoAction({
                        blockEvents: {
                            click: function (): void {
                                setTimeout(()=> submitHandler.publish('NavigateToProfileEdit'), 1000);
                                Router.getInstance().go(Routes.ProfileEdit);
                            }
                        },
                        blockPropsAndChildren: {
                            actionName: 'Изменить данные',
                        }
                    }),
                    new ProfileInfoAction({
                        blockEvents: {
                            click: function (): void {
                                Router.getInstance().go(Routes.ProfileEdit);
                            }
                        },
                        blockPropsAndChildren: {
                            actionName: 'Изменить пароль',
                        }
                    }),
                    new ProfileInfoAction({
                        blockEvents: {
                            click: function (): void {
                                AuthController.logout();
                                Router.getInstance().go(Routes.Login);
                            }
                        },
                        blockPropsAndChildren: {
                            actionName: 'Выйти',
                        }
                    })
                ]
            }
        }),
        navigateBack: new NavigateBack({
            blockEvents: {
                click: function (): void {
                    Router.getInstance().go(Routes.Chat);
                }
            },
            blockPropsAndChildren: {}
        }),
    }
}
