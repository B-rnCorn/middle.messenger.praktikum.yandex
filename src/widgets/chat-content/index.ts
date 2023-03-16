import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat-content.hbs';

export type ChatContentProps = {
    blockPropsAndChildren: {
        imageUrl: string,
        name: string,
    }
}

export class ChatContent extends Block<ChatContentProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
