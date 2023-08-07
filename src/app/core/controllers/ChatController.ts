import store from "~/app/core/store/Store";
import {ChatAPI, CreateChatData} from "~/app/core/api";
import {submitHandler} from "~/app/core/SubmitHandler";
import {ErrorResponse} from "~/app/core/types";
import MessagesController from "~/app/core/controllers/MessagesController";
import {AddUserToChatData, ChangeChatAvtarRequest, DeleteUserFromChat} from "~/app/core/api/ChatAPI";

class ChatController {
    private api: ChatAPI;

    constructor() {
        this.api = new ChatAPI();
    }

    async fetchChats() {
        try {
            const chats = await this.api.fetchChats();
            chats.map(async(chat) => {
                const token = await this.getToken(chat.id);
                if (token) {
                    await MessagesController.connect(chat.id, token);
                }
            });
            store.set('chats',chats);
            submitHandler.publish('ChatListUpdated');
        } catch (e) {
            console.log(`!!!ERROR: ${e}`);
        }
    };

    async getChatUsers(selectedChatId: number) {
        try {
            store.set('selectedChatUsers', undefined);
            const users = await this.api.getChatUsers(selectedChatId);
            store.set('selectedChatUsers', users);
        } catch (e) {
            console.log(`!!!ERROR: ${e}`);
        }
    }

    async addUsersToChat(data: AddUserToChatData) {
        try {
            await this.api.addUserToChat(data);
            await this.getChatUsers(data.chatId);
            submitHandler.publish('ChatMembersListUpdate');
        } catch (e) {
            console.log(`!!!ERROR: ${e}`);
        }
    }

    async deleteUserFromChat(data: DeleteUserFromChat) {
        try {
            await this.api.deleteUserFromChat(data);
            await this.getChatUsers(data.chatId);
            submitHandler.publish('ChatMembersListUpdate');
        } catch (e) {
            console.log(`!!!ERROR: ${e}`);
        }
    }

    async changeChatAvatar(data: ChangeChatAvtarRequest) {
        try {
            await this.api.changeChatAvatar(data);
            await this.fetchChats();
        } catch (e) {
            console.log(`!!!ERROR: ${e}`);
        }
    }


    async deleteChat(selectedChatId: number) {
        try {
            await this.api.deleteChat(selectedChatId);
            store.set('selectedChatId', undefined);
        } catch (e) {
            console.log(`!!!ERROR: ${e}`);
        }
    }

    async createChat(data: CreateChatData) {
        try {
            await this.api.createChat(data);
        } catch (e) {
            console.log(`!!!ERROR: ${e}`);
        }
    };

    async getToken(id: number) {
        let token;
        try {
            token = await this.api.getToken(id);
        } catch (e: unknown) {
            store.set("Error: Failed to fetch token", (e as ErrorResponse).reason);
        }
        //@ts-expect-error бредовуха, при присвоении токену значения сразу не работает ???
        return token.token;
    }
}

export default new ChatController();
