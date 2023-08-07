import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat-list.hbs';
import {ChatListItem} from "~/entities/chat-list-item";
import {ChatSearch} from "~/entities/chat-search";
import store from "~/app/core/store/Store";
import * as images from "~/images/image-urls";
import {submitHandler} from "~/app/core/SubmitHandler";
import {ProfileNavigateButton} from "~/features/profile-navigate-button";

export type ChatListProps = {
    blockPropsAndChildren: {
        search: ChatSearch,
        chatListItems: ChatListItem[],
        profileNavigateButton: ProfileNavigateButton,
    }
}

export class ChatList extends Block<ChatListProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('ChatListUpdated', this.componentForceUpdate, this);
    }

    protected render(): DocumentFragment {

        try {
            this.children.chatListItems = store.getState()?.chats?.map(chat => {
                return new ChatListItem({
                    blockEvents: {
                        click: function (): void {
                            store.set('selectedChatId', chat.id);
                            submitHandler.publish('ChatSelected');
                        }
                    },
                    blockPropsAndChildren: {
                        imageUrl: chat.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + chat.avatar : images.chatImageUrl.toString(),
                        name: chat.title,
                        lastMessage: chat.last_message?.content ?? '',
                        lastMessageTime: chat.last_message?.time ? `${new Date(chat.last_message.time).getHours()}:${new Date(chat.last_message.time).getMinutes()}` :'',
                        unreadMessageCount: chat.unread_count,
                    }
                });
            }) ?? [];
        } catch (e) {
            console.log(e);
        }
        return this.compile(template, this.blockProps);
    }
}
