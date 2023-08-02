import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/chat-message.hbs';

export type ChatMessageProps = {
    blockPropsAndChildren: {
        file?: string,
        author?: string,
        content: string,
        date: string,
        isMyMessage: boolean,
    }
}

export class ChatMessage extends Block<ChatMessageProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
