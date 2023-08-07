import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/create-chat-modal-window.hbs';
import {Card} from "~/shared/card";
import {submitHandler} from "~/app/core/SubmitHandler";
import {BlockOwnProps} from "~/app/core/types";
import chatController from "~/app/core/controllers/ChatController";

export type CreateChatModalWindowProps = {
    blockPropsAndChildren: {
        inputFieldName: string;
        card: Card;
    }
}
export class CreateChatModalWindow extends Block<CreateChatModalWindowProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('CreateChatIconClick', this.showModal, this);
        submitHandler.subscribe('CloseCreateChatModal', this.hide, this);
        submitHandler.subscribe('CreateChatSubmitted', this.submitChatCreation, this);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    protected componentDidMount(oldProps: BlockOwnProps) {
        this.hide();
        super.componentDidMount(oldProps);
    }

    protected showModal() {
        this.show('flex')
    }

    protected submitChatCreation(): void {
        const chatTitle = (<HTMLInputElement> this.getContent()!.querySelector(`[name=${this.blockProps.inputFieldName}]`)).value;

        if (chatTitle) {
            chatController.createChat({title: chatTitle}).then(() => {
                chatController.fetchChats().then(()=> submitHandler.publish('CloseCreateChatModal'));
            });
        }
    }
}
