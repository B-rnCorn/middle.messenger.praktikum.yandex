import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/menu-item.hbs';
import {BlockEvents} from "~/app/core/types";

export type MenuItemProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
        itemId?: number,
        text: string,
    }
}

export class MenuItem extends Block<MenuItemProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
