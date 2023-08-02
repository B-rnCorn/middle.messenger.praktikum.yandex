import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/user-list.hbs';
import store from "~/app/core/store/Store";
import {UserListItem} from "~/entities/user-list-item";
import {submitHandler} from "~/app/core/SubmitHandler";
import chatController from "~/app/core/controllers/ChatController";

export type UserListProps = {
    blockPropsAndChildren: {
        userListItems: UserListItem[],
    }
}

export class UserList extends Block<UserListProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('ChatMembersListUpdate', this.componentForceUpdate, this);
    }

    protected render(): DocumentFragment {

        try {
            this.children.userListItems = store.getState()?.selectedChatUsers?.map(user => {
                return new UserListItem({
                    blockEvents: {
                        click: function (): void {
                            const selectedChatId = store.getState()?.selectedChatId;
                            selectedChatId && chatController.deleteUserFromChat({
                                users: [user.id],
                                chatId: selectedChatId,
                            });
                        }
                    },
                    blockPropsAndChildren: {
                        text: `${user.login} : ${user.first_name} ${user.second_name}`,
                        userId: user.id
                    }
                });
            }) ?? [];
        } catch (e) {
            console.log(e);
        }
        return this.compile(template, this.blockProps);
    }
}
