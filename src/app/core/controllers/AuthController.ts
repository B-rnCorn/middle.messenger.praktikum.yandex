import {AuthAPI, SigninData, SignupData} from "~/app/core/api";
import store from "~/app/core/store/Store";
import {Router, Routes} from "~/app/core/router";
import MessagesController from "~/app/core/controllers/MessagesController";
import {ChangeUserProfileRequestData, SearchUsersRequest} from "~/app/core/api/AuthAPI";
import {submitHandler} from "~/app/core/SubmitHandler";

class AuthController {
    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);
            await this.fetchUser();
            Router.getInstance().go(Routes.Chat);
        } catch (e) {
            console.error(e);
        }
    };

    async signin(data: SigninData) {
        try {
            await this.api.signin(data);
            await this.fetchUser();
            Router.getInstance().go(Routes.Chat);
        } catch (e) {
            store.set('error', (e as Error).message);
        }
    };

    async logout() {
        try {
            MessagesController.closeAll();
            await this.api.logout();
            store.set('user',undefined);
        } catch (e) {
            store.set('error', (e as Error).message);
        }
    };

    async fetchUser() {
        try {
            store.set('isLoading', true);
            const user = await this.api.fetchUser();
            store.set('user',user);
            store.set('isLoading', false);
        } catch (e) {
            store.set('error', (e as Error).message);
        }
    };

    async updateUserInfo(info: ChangeUserProfileRequestData) {
        try {
            await this.api.updateUserInfo(info);
            await this.fetchUser();
            submitHandler.publish('NavigateToProfileEdit');
        } catch (e) {
            console.error(e);
        }
    }

    async updateUserAvatar(data: FormData) {
        try {
            await this.api.updateUserAvatar(data);
            await this.fetchUser();
            submitHandler.publish('NavigateToProfileEdit');
        } catch (e) {
            console.error(e);
        }
    }

    async searchUsers(searchRequest: SearchUsersRequest) {
        try {
            store.set('searchedUsersForAdd', []);
            const users = await this.api.searchUsers(searchRequest);
            store.set('searchedUsersForAdd', users);
        } catch (e) {
            console.error(e);
        }
    }
}

export default new AuthController();
