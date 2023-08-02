import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/profile-info-action.hbs';
import {BlockEvents} from "~/app/core/types";

export type ProfileInfoActionProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
        actionName: string,
    }
}
export class ProfileInfoAction extends Block<ProfileInfoActionProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
