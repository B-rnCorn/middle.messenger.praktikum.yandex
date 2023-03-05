import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat.hbs';

export class ChatPage extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
