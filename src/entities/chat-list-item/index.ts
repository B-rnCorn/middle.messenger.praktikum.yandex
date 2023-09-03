import {Block} from '~/app/core/Block';
import template from './ui/chat-list-item.hbs';
import {BlockEvents} from "~/app/core/types";

export type ChatListItemProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
        imageUrl: string,
        name: string,
        lastMessage: string,
        lastMessageTime: string,
        unreadMessageCount?: number,
    }
}

export class ChatListItem extends Block<ChatListItemProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
