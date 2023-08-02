import {Block} from '~/app/core/Block';
//@ts-expect-error template
import template from './ui/chat-content.hbs';
import {ChatMessage} from "~/entities/chat-message";
import {MessageForm} from "~/features/message-form";
import {submitHandler} from "~/app/core/SubmitHandler";
import store from "~/app/core/store/Store";
import MessagesController from "~/app/core/controllers/MessagesController";
import {MenuItem} from "~/entities/menu-item";

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
        submitHandler.subscribe('MessagesUpdate', this.componentForceUpdate, this);
    }

    protected render(): DocumentFragment {
        const selectedChatId = store.getState().selectedChatId;
        const selectedChatMessages = store.getState().selectedChatMessages;

        if (selectedChatId && selectedChatMessages && selectedChatMessages[selectedChatId]) {
            this.children.chatMessages = selectedChatMessages[selectedChatId].map(item =>
                new ChatMessage({
                    blockPropsAndChildren: {
                        author: item.user_id.toString(),
                        isMyMessage: item.user_id === store.getState().user?.id,
                        content: item.content,
                        date: `${new Date(item.time).getHours()}:${new Date(item.time).getMinutes()}`,
                    }
                })) ?? [];
        } else {
            this.children.chatMessages = [];
        }

        return this.compile(template, this.blockProps);
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
