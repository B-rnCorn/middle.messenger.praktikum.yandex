import {Block} from "~/app/core/Block";
// @ts-expect-error
import template from "./ui/chat-search.hbs";
import {IconButton} from "~/shared/icon-button";

export type ChatSearchProps = {
    blockPropsAndChildren: {
        searchIconUrl: string,
        addChatButton: IconButton,
    }
}

export class ChatSearch extends Block<ChatSearchProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
