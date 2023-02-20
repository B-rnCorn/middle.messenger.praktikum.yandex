import { chatConfig } from '../pages/chat/config'
import { loginConfig } from '../pages/login/config';
import { registrationConfig } from '../pages/registration/config';
import { profileConfig } from '../pages/profile/config';
import { profileEditConfig} from '../pages/profile-edit/config';
import { errorServerConfig } from '../pages/error-server/config';
import { errorNotFoundConfig } from '../pages/error-not-found/config';
import { loadFileModalConfig} from '../widgets/load-file-modal-window/config';

import profile from '../pages/profile/ui/profile.hbs'
import profileInformation from '../widgets/profile-information/ui/profile-information.hbs'
import profileInfoItem from '../entities/profile-info-item/ui/profile-info-item.hbs'
import profileInfoAction from '../entities/profile-info-action/ui/profile-info-action.hbs'
import navigateBack from '../features/navigate-back/ui/navigate-back.hbs'

import profileEdit from '../pages/profile-edit/ui/profile-edit.hbs'
import profileInformationEditForm from '../widgets/profile-information-edit-form/ui/profile-information-edit-form.hbs'

import chat from '../pages/chat/ui/chat.hbs'
import chatList from '../widgets/chat-list/ui/chat-list.hbs'
import chatListItem from  '../entities/chat-list-item/ui/chat-list-item.hbs'
import chatContent from '../widgets/chat-content/ui/chat-content.hbs'

import login from '../pages/login/ui/login.hbs'
import loginForm from '../widgets/login-form/ui/login-form.hbs'

import registration from '../pages/registration/ui/registration.hbs'
import registrationForm from  '../widgets/registration-form/ui/registration-form.hbs'

import errorNotFound from '../pages/error-not-found/error-not-fount.hbs'
import errorServer from '../pages/error-server/error-server.hbs'
import errorPageContent from '../widgets/error-page-content/error-page-content.hbs'

import loadFileModalWindow from '../widgets/load-file-modal-window/ui/load-file-modal-window.hbs'
import loadFile from '../features/load-file/ui/load-file.hbs'

import card from '../shared/card/card.hbs'
import input from '../shared/input/input.hbs'
import button from '../shared/button/button.hbs'

import demo from '../app/demo-error-pages/demo.hbs'

import * as Handlebars from "handlebars/dist/handlebars.runtime";

const ROUTES = {
    Chat: chat,
    Profile: profile,
    ProfileEdit: profileEdit,
    Login: login,
    Registration: registration,
    ErrorNotFound: errorNotFound,
    ErrorServer: errorServer,
    LoadFileModalWindow: loadFileModalWindow,
}

const PARTIALS = {
    Chat: registerPartialsForChat,
    Login: registerPartialsForLogin,
    Registration: registerPartialsForRegistration,
    Profile: registerPartialsForProfile,
    ProfileEdit: registerPartialsForProfileEdit,
    ErrorNotFound: registerPartialsForErrorNotFound,
    ErrorServer: registerPartialsForErrorServer,
    LoadFileModalWindow: registerPartialsForLoadFileModalWindow,
}

const CONFIGS = {
    Chat: chatConfig,
    Login: loginConfig,
    Registration: registrationConfig,
    Profile: profileConfig,
    ProfileEdit: profileEditConfig,
    ErrorNotFound: errorNotFoundConfig,
    ErrorServer: errorServerConfig,
    LoadFileModalWindow: loadFileModalConfig,
}
function render(html) {
    const app = document.querySelector('#app');

    app.innerHTML = html;
}

window.navigateByRoutes = function (routeName) {
    const page = ROUTES[routeName];

    PARTIALS[routeName] && PARTIALS[routeName]();

    render(page(CONFIGS[routeName]));
}

window.addEventListener('DOMContentLoaded',() => {
    registerPartialsForLogin();

    render(ROUTES.Login(CONFIGS.Login));
});

function registerPartialsForChat() {
    // TODO: REMOVE
    Handlebars.registerPartial('demo', demo);

    Handlebars.registerPartial('chat-list', chatList);
    Handlebars.registerPartial('chat-item', chatListItem);
    Handlebars.registerPartial('chat-content', chatContent);
}

function registerPartialsForRegistration() {
    Handlebars.registerHelper('isError', function (value) {
        return value === 'error';
    });

    Handlebars.registerPartial('input', input)
    Handlebars.registerPartial('card', card);
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('card-content', registrationForm);
}

function registerPartialsForProfile() {
    Handlebars.registerPartial('profile-information', profileInformation);
    Handlebars.registerPartial('profile-info-item', profileInfoItem);
    Handlebars.registerPartial('profile-info-action', profileInfoAction);
    Handlebars.registerPartial('navigate-back', navigateBack);
}

function registerPartialsForProfileEdit() {
    Handlebars.registerPartial('profile-information-edit-form', profileInformationEditForm);
    Handlebars.registerPartial('input', input);
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('navigate-back', navigateBack);
}

function registerPartialsForErrorNotFound() {
    Handlebars.registerPartial('error-page-content', errorPageContent);
}

function registerPartialsForErrorServer() {
    Handlebars.registerPartial('error-page-content', errorPageContent);
}

function registerPartialsForLogin() {

    Handlebars.registerHelper('isError', function (value) {
        return value === 'error';
    });

    // TODO: REMOVE
    Handlebars.registerPartial('demo', demo);

    Handlebars.registerPartial('input', input);
    Handlebars.registerPartial('card', card);
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('card-content', loginForm);
}

function registerPartialsForLoadFileModalWindow() {
    Handlebars.registerPartial('input', input);
    Handlebars.registerPartial('card', card);
    Handlebars.registerPartial('button', button);
    Handlebars.registerPartial('card-content', loadFile);
}

window.preventDefaultEvent = (e) => {
    e.preventDefault();
}
