import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat-list.hbs';
import {ChatListItem} from "~/entities/chat-list-item";

export type ChatListProps = {
    blockPropsAndChildren: {
        chatListItems: ChatListItem[]
    }
}

export class ChatList extends Block<ChatListProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
