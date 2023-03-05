import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat-list.hbs';

export class ChatList extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
