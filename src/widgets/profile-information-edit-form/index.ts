import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-information-edit-form.hbs';
import {InputField} from "~/shared/input-field";
import {Button} from "~/shared/button";
import {BlockEvents} from "~/app/core/types";

export type ProfileInformationEditFormProps = {
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        imageUrl: string,
        profileFormItems: InputField[],
        profileFormButton: Button
    }
}
export class ProfileInformationEditForm extends Block<ProfileInformationEditFormProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
