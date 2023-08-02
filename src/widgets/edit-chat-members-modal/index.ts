import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/edit-chat-members-modal.hbs';
import {Card} from "~/shared/card";
import {submitHandler} from "~/app/core/SubmitHandler";
import {BlockOwnProps} from "~/app/core/types";
import authController from "~/app/core/controllers/AuthController";
import store from "~/app/core/store/Store";
import {MenuItem} from "~/entities/menu-item";
import chatController from "~/app/core/controllers/ChatController";

export type EditChatMembersModalProps = {
    blockPropsAndChildren: {
        inputFieldName: string;
        card: Card;
    }
}
export class EditChatMembersModal extends Block<EditChatMembersModalProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('EditChatMembersClick', this.showModal, this);
        submitHandler.subscribe('CloseEditChatMembersModal', this.hide, this);
        submitHandler.subscribe('SearchMembersSubmitted', this.searchMembersSubmitted, this);
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

    protected searchMembersSubmitted(): void {
        const login = (<HTMLInputElement> this.getContent()!.querySelector(`[name=${this.blockProps.inputFieldName}]`)).value;

        if (login) {
            authController.searchUsers({login: login});
            //@ts-expect-error костыль
            this.children.card.children.body[1].children.menuItems = store.getState().searchedUsersForAdd?.map(user => {
               return new MenuItem({
                   blockEvents: {
                       click: () => {
                           const selectedChatId = store.getState()?.selectedChatId;
                           selectedChatId && chatController.addUsersToChat({
                               users: [user.id],
                               chatId: selectedChatId,
                           });
                       }
                   },
                   blockPropsAndChildren: {
                       itemId: user.id,
                       text: user.login,
                   }
               })
            });
            submitHandler.publish('SearchSelect');
        }
    }
}
