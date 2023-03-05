import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/chat-content.hbs';

export class ChatContent extends Block {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
