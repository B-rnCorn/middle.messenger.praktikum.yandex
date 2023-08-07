import {loginConfig} from '~/pages/login/model/config';
import {registrationConfig} from '~/pages/registration/model/config';
import {LoginPage} from "~/pages/login";
import {Router, Routes} from "~/app/core/router";
import {RegistrationPage} from "~/pages/registration";
import ChatPage from "~/pages/chat";
import {chatConfig} from "~/pages/chat/model/config";
import store from "~/app/core/store/Store";
import AuthController from "~/app/core/controllers/AuthController";
import ProfilePage from "~/pages/profile";
import {profileConfig} from "~/pages/profile/model/config";
import {ProfileEdit} from "~/pages/profile-edit";
import {profileEditConfig} from "~/pages/profile-edit/model/config";

window.addEventListener('DOMContentLoaded', async () => {
    const router = Router.getInstance();
    router
        .use<LoginPage>(Routes.Login, new LoginPage(loginConfig))
        .use<RegistrationPage>(Routes.Registration, new RegistrationPage(registrationConfig))
        //@ts-expect-error типизация выглядит правильной Component extends Block но ошибка :(
        .use<typeof ChatPage>(Routes.Chat, new ChatPage(chatConfig))
        //@ts-expect-error -//-
        .use<typeof ProfilePage>(Routes.Profile, new ProfilePage(profileConfig))
        //@ts-expect-error -//-
        .use<typeof ProfileEdit>(Routes.ProfileEdit, new ProfileEdit(profileEditConfig));

    let isProtectedRoute;
    switch (window.location.pathname) {
        case Routes.Login:
        case Routes.Registration:
            isProtectedRoute = false;
            break;
        default:
            isProtectedRoute = true;
            break;
    }

    try {
        await AuthController.fetchUser();
        if (!store.getState()!.user?.id) {
            throw Error("Пользователь не авторизован");
        }
        router.start();
        //router.go(Routes.Chat);
    } catch (e) {
        router.start();
        if (isProtectedRoute) {
            router.go(Routes.Login);
        }
    }
});
