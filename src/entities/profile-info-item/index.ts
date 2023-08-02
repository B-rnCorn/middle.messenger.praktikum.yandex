import {Block} from '~/app/core/Block';
// @ts-expect-error
import template from './ui/profile-info-item.hbs';

export type ProfileInfoItemProps = {
    blockPropsAndChildren: {
        itemName: string,
        itemValue: string,
    }
}

export class ProfileInfoItem extends Block<ProfileInfoItemProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
