import {Block} from '~/app/core/Block';
//@ts-expect-error template
import template from './ui/chat-content.hbs';
import {ChatMessage} from "~/entities/chat-message";
import {MessageForm} from "~/features/message-form";
import {submitHandler} from "~/app/core/SubmitHandler";
import store from "~/app/core/store/Store";
import MessagesController from "~/app/core/controllers/MessagesController";
import {MenuItem} from "~/entities/menu-item";
import * as images from "~/images/image-urls";

export type ChatContentProps = {
    blockPropsAndChildren: {
        imageUrl: string,
        name: string,
        chatMessages: ChatMessage[];
        messageForm: MessageForm;
        menuItems: MenuItem[];
    }
}

export class ChatContent extends Block<ChatContentProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('ChatSelected', this.selectedChatUpdate, this);
        submitHandler.subscribe('MessagesUpdate', this.setChildAndProps, this);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    protected setChildAndProps(): void {
        const selectedChatId = store.getState().selectedChatId;
        const selectedChatMessages = store.getState().selectedChatMessages;
        const chat = store.getState().chats?.find(chat => chat.id === selectedChatId);

        if (selectedChatId && selectedChatMessages && selectedChatMessages[selectedChatId]) {
            if (chat) this.blockProps.imageUrl = chat.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + chat.avatar : images.chatImageUrl.toString();
            this.children.chatMessages = selectedChatMessages[selectedChatId].map(item =>
                new ChatMessage({
                    blockPropsAndChildren: {
                        author: item.user_id.toString(),
                        isMyMessage: item.user_id === store.getState().user?.id,
                        content: item.content,
                        date: `${new Date(item.time).getHours()}:${new Date(item.time).getMinutes()}`,
                    }
                })) ?? [];
            this.componentForceUpdate();
        } else {
            this.children.chatMessages = [];
        }
    }

    private selectedChatUpdate(): void {
        const selectedChatId = store.getState().selectedChatId;
        if (selectedChatId) {
            store.set(`selectedChatMessages.${selectedChatId}`, undefined);
            MessagesController.fetchOldMessages(selectedChatId);
        }
        this.setProps({name: store.getState().chats?.find(chat => chat.id === selectedChatId)?.title ?? ''});
    }
}
