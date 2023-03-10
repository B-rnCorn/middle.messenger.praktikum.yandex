import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-info-action.hbs';

export type ProfileInfoActionProps = {
    blockPropsAndChildren: {
        actionName: string,
        route?: string,
    }
}
export class ProfileInfoAction extends Block<ProfileInfoActionProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
