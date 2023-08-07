import {BaseAPI} from "~/app/core/api/utils";
import {BASE_URL} from "~/app/core/api/constants";

export interface SignupData {
    first_name: "string",
    second_name: "string",
    login: "string",
    email: "string",
    password: "string",
    phone: "string"
}

export interface SignupResponse {
    "id": number,
}

export interface SigninData {
    login: "string",
    password: "string"
}

export interface UserData {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string
}

export interface ChangeUserProfileRequestData {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
}

export interface SearchUsersRequest {
    login: string,
}

export class AuthAPI extends BaseAPI {
    constructor() {
        super(BASE_URL);
    }

    signup(data: SignupData) {
        return this.http.post<SignupResponse>('auth/signup', {data})
    }

    signin(data: SigninData) {
        return this.http.post<SigninData>('auth/signin', {data})
    }

    logout() {
        return this.http.post('auth/logout');
    }

    fetchUser() {
        return this.http.get<UserData>('auth/user');
    }

    updateUserInfo(data: ChangeUserProfileRequestData) {
        return this.http.put<void>('user/profile', {data});
    }

    updateUserAvatar(data: FormData) {
        return this.http.put<void>('user/profile/avatar', {data, headers: {}, timeout: 15000});
    }

    searchUsers(data: SearchUsersRequest) {
        return this.http.post<UserData[]>('user/search', {data})
    }
}
