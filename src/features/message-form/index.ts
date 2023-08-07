import {Block} from "~/app/core/Block";
//@ts-expect-error template
import template from "./ui/message-form.hbs";
import {BlockEvents} from "~/app/core/types";
import { submitHandler } from "~/app/core/SubmitHandler";
import {Input} from "~/shared/input";
import MessagesController from "~/app/core/controllers/MessagesController";
import store from "~/app/core/store/Store";
import {isEmpty} from "~/shared/helpers/utils-helpers";

export type MessageFormProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
        inputFieldName: string,
        messageFormInput: Input,
    }
}

export class MessageForm extends Block<MessageFormProps> {

    submitHandler: typeof submitHandler;

    protected init() {
        super.init();

        this.submitHandler = submitHandler;
        this.submitHandler.subscribe('MessageFormSubmitted', this.sendMessage, this);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    private sendMessage(): void {
        let messageText = this.getMessageText();
        const selectedChatId = store.getState().selectedChatId;

        selectedChatId && !isEmpty(messageText) && MessagesController.sendMessage(selectedChatId, messageText);

        this.clearMessageText();
    }

    getMessageText(): string {
        return (<HTMLInputElement> this.getContent()!.querySelector(`[name=${this.blockProps.inputFieldName}]`)).value ?? '';
    }

    clearMessageText(): void {
        (<HTMLInputElement> this.getContent()!.querySelector(`[name=${this.blockProps.inputFieldName}]`)).value = '';
    }
}
