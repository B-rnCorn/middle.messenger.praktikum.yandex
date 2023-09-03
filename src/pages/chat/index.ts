import {Block} from '~/app/core/Block';
import template from './ui/chat.hbs';
import {ChatList} from "~/widgets/chat-list";
import {ChatContent} from "~/widgets/chat-content";
import { submitHandler } from '~/app/core/SubmitHandler';
import ChatController from "~/app/core/controllers/ChatController";
import {BlockOwnProps} from "~/app/core/types";
import {CreateChatModalWindow} from "~/widgets/create-chat-modal-window";
import {EditChatMembersModal} from "~/widgets/edit-chat-members-modal";

export type ChatPageProps = {
    tagName?: string,
    blockPropsAndChildren: {
        chatList: ChatList,
        activeChat: ChatContent,
        createChatModal: CreateChatModalWindow,
        editChatMembersModal: EditChatMembersModal,
    }
}

class ChatPage extends Block<ChatPageProps> {

    submitHandler: typeof submitHandler;

    protected init() {
        super.init();

        this.submitHandler = submitHandler;
    }

    protected componentDidMount(oldProps: BlockOwnProps) {
        super.componentDidMount(oldProps);

        ChatController.fetchChats();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}

export default ChatPage;
