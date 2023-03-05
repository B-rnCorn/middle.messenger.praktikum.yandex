import {chatConfig} from '~/pages/chat/model/config'
import {loginConfig} from '~/pages/login/model/config';
import {registrationConfig} from '~/pages/registration/model/config';
import {profileConfig} from '~/pages/profile/model/config';
import {profileEditConfig} from '~/pages/profile-edit/model/config';
import {errorServerConfig} from '~/pages/error-server/model/config';
import {errorNotFoundConfig} from '~/pages/error-not-found/model/config';
//import {loadFileModalConfig} from '~/widgets/load-file-modal-window/model/config';

import {ErrorNotFound} from '~/pages/error-not-found';
import {ErrorServer} from "~/pages/error-server/index.htm";
import {LoginPage} from "~/pages/login";
import {RegistrationPage} from "~/pages/registration";
import {Block} from "~/app/core/Block";
import {ChatPage} from "~/pages/chat";
import {Profile} from "~/pages/profile";
import {ProfileEdit} from "~/pages/profile-edit";

export const enum Routes {
    Login = 'Login',
    Registration = 'Registration',
    Chat = 'Chat',
    Profile = 'Profile',
    ProfileEdit = 'ProfileEdit',
    ErrorNotFound = 'ErrorNotFound',
    ErrorServer = 'ErrorServer',
}

// @ts-ignore
window.navigateByRoutes = function (routeName: string): void {
    switch (routeName) {
        case Routes.Login:
            render(new LoginPage(loginConfig));
            break;
        case Routes.Registration:
            render(new RegistrationPage(registrationConfig));
            break;
        case Routes.Chat:
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
            break;
        default:
            return;
    }
}

function render(page: Block): Element | null  {
    const app = document.querySelector('#app');
    if (app && !!page.getContent()) {
        app.innerHTML = '';
        app.appendChild(page.getContent()!);
        page.dispatchComponentDidMount();
        return app;
    }
    return null;
}

window.addEventListener('DOMContentLoaded', () => {
    const page = new LoginPage(loginConfig)//new ErrorNotFound(errorNotFoundConfig);
    return render(page);
});

// @ts-ignore
window.preventDefaultEvent = (e: SubmitEvent) => {
    e.preventDefault();
}
