import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/chat.hbs';
import {ChatList} from "~/widgets/chat-list";
import {ChatContent} from "~/widgets/chat-content";
import { submitHandler } from '~/app/core/SubmitHandler';
import withControllers from "~/app/core/providers/withControllers";
import AuthController from "~/app/core/controllers/AuthController";
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

        this.blockProps.controllers.chat.fetchChats();
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}

export default withControllers(ChatPage, {auth: AuthController, chat: ChatController});
