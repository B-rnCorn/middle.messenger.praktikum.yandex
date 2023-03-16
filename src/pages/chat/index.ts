import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat.hbs';
import {ChatList} from "~/widgets/chat-list";
import {ChatContent} from "~/widgets/chat-content";

export type ChatPageProps = {
    blockPropsAndChildren: {
        chatList: ChatList,
        activeChat: ChatContent,
    }
}

export class ChatPage extends Block<ChatPageProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
