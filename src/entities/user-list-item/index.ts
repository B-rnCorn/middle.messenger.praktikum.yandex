import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/user-list-item.hbs';
import {BlockEvents} from "~/app/core/types";

export type UserListItemProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
        text: string,
        userId: number,
    }
}

export class UserListItem extends Block<UserListItemProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
