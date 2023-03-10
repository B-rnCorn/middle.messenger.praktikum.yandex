import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat-list-item.hbs';

export type ChatListItemProps = {
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
