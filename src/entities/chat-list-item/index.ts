import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat-list-item.hbs';

export class ChatListItem extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
