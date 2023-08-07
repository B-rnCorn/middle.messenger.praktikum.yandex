import {BaseAPI} from "~/app/core/api/utils";
import {UserData} from "~/app/core/api/AuthAPI";
import {BASE_URL} from "~/app/core/api/constants";

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

export type ChangeChatAvtarRequest = FormData;

export class ChatAPI extends BaseAPI {
    constructor() {
        super(BASE_URL + '/chats');
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

    changeChatAvatar(data: ChangeChatAvtarRequest) {
        return this.http.put<void>('avatar', {data, headers: {}, timeout: 15000});
    }

    getToken(id: number): Promise<{token: string}> {
        return  this.http.post<{token: string}>(`token/${id}`);
    }
}
