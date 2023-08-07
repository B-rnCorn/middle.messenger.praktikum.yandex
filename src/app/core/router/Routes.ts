import {LoginPage} from "~/pages/login";
import {loginConfig} from "~/pages/login/model/config";
import {RegistrationPage} from "~/pages/registration";
import {registrationConfig} from "~/pages/registration/model/config";
import {errorNotFoundConfig} from "~/pages/error-not-found/model/config";
import {ErrorNotFound} from "~/pages/error-not-found";
import ChatPage from "~/pages/chat";
import {chatConfig} from "~/pages/chat/model/config";
import ProfilePage from "~/pages/profile";
import {profileConfig} from "~/pages/profile/model/config";
import {ProfileEdit} from "~/pages/profile-edit";
import {profileEditConfig} from "~/pages/profile-edit/model/config";

export const enum Routes {
    Login = '/',
    Registration = '/sign-up',
    Chat = '/messenger',
    Profile = '/settings',
    ProfileEdit = '/profile-edit',
    ErrorNotFound = '/error-not-found',
    ErrorServer = '/error-server',
}

export function createPageInstance(pathname: Routes) {
    switch (pathname) {
        case Routes.Login:
            return new LoginPage(loginConfig);
        case Routes.Registration:
            return new RegistrationPage(registrationConfig);
        case Routes.Chat:
            return new ChatPage(chatConfig);
        case Routes.Profile:
            return new ProfilePage(profileConfig);
        case Routes.ProfileEdit:
            return new ProfileEdit(profileEditConfig);
        /*case Routes.Chat:
            render(new ChatPage(chatConfig));
            break;
        case Routes.Profile:
            render(new Profile(profileConfig));
            break;
        case Routes.ProfileEdit:
            render(new ProfileEdit(profileEditConfig));
            break;
        case Routes.ErrorServer:
            render(new ErrorServer(errorServerConfig));
            break;
        case Routes.ErrorNotFound:
            render(new ErrorNotFound(errorNotFoundConfig));
            break;*/
        default:
            return new ErrorNotFound(errorNotFoundConfig);
    }
}
