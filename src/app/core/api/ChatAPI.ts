import {BaseAPI} from "~/app/core/api/utils";
import {UserData} from "~/app/core/api/AuthAPI";

export interface ChatData {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    last_message: {
        user: UserData,
        time: string,
        content: string
    }
}

export interface ChatUserInfo {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string,
    role: string
}

export type CreateChatData = Pick<ChatData,'title'>

export type AddUserToChatData = {
    users: number[],
    chatId: number
}

export type DeleteUserFromChat = AddUserToChatData;

export class ChatAPI extends BaseAPI {
    constructor() {
        super('https://ya-praktikum.tech/api/v2/chats');
    }

    fetchChats() {
        return this.http.get<ChatData[]>('');
    }

    getChatUsers(selectedChatId: number) {
        return this.http.get<ChatUserInfo>(`${selectedChatId}/users`);
    }

    deleteChat(chatId: number) {
        return this.http.delete<void>(``, {data: {chatId}});
    }

    createChat(data: CreateChatData) {
        return this.http.post<CreateChatData>('', {data});
    }

    addUserToChat(data: AddUserToChatData) {
        return this.http.put<void>('users', {data});
    }

    deleteUserFromChat(data: AddUserToChatData) {
        return this.http.delete<void>('users', {data});
    }

    getToken(id: number): Promise<{token: string}> {
        return  this.http.post<{token: string}>(`token/${id}`);
    }
}
