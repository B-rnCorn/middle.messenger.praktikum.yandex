import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/profile-information-edit-form.hbs';
import {InputField} from "~/shared/input-field";
import {Button} from "~/shared/button";
import {BlockEvents} from "~/app/core/types";
import store from "~/app/core/store/Store";
import {LOCALIZED_FIELD_NAMES, USER_FIELDS_NAMES, INTERNAL_FIELD_NAMES} from "./constants";
import {submitHandler} from "~/app/core/SubmitHandler";
import {Input} from "~/shared/controlled-input";
import {REGULAR_EXPRESSION_PATTERNS, REGULAR_EXPRESSION_VALIDATION_TEXT} from "~/shared/constants";
import {isValid} from "~/shared/helpers/validate-helpers";
import authController from "~/app/core/controllers/AuthController";
import {ChangeUserProfileRequestData} from "~/app/core/api/AuthAPI";
import {ImgLoadIcon} from "~/shared/img-load-icon";
import * as images from "~/images/image-urls";

export type ProfileInformationEditFormProps = {
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        imageLoadIcon: ImgLoadIcon,
        profileFormItems: InputField[],
        profileFormButton: Button
    }
}
export class ProfileInformationEditForm extends Block<ProfileInformationEditFormProps> {
    protected init() {
        super.init();

        submitHandler.subscribe('NavigateToProfileEdit', this.setChildAndProps, this);
        submitHandler.subscribe('ProfileInformationFormSubmitted', this.sendForm, this);
        setTimeout(()=> submitHandler.publish('NavigateToProfileEdit'), 1000);
    }
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    protected setChildAndProps () {
        const userInfo = store.getState().user;

        if (userInfo) {
            //@ts-expect-error
            this.children.imageLoadIcon.blockProps.imageUrl = this.blockProps.imageUrl = userInfo.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + userInfo.avatar : images.chatImageUrl.toString();
            //@ts-expect-error
            this.children.profileFormItems =  Object.keys(userInfo).map((userDataKey) => {
                if (USER_FIELDS_NAMES.includes(userDataKey)) {
                    return new InputField({
                        blockPropsAndChildren: {
                            inputFieldId: INTERNAL_FIELD_NAMES[userDataKey],
                            inputFieldName: INTERNAL_FIELD_NAMES[userDataKey],
                            inputFieldLabel: LOCALIZED_FIELD_NAMES[userDataKey],
                            inputFieldRegExpPattern: REGULAR_EXPRESSION_PATTERNS[userDataKey],
                            inputFieldErrorText: REGULAR_EXPRESSION_VALIDATION_TEXT[userDataKey],
                            isInputFieldValid: true,
                            isMandatory: true,
                            isFormInput: false,
                            input: new Input({
                                blockPropsAndChildren: {
                                    inputId: INTERNAL_FIELD_NAMES[userDataKey],
                                    inputName: INTERNAL_FIELD_NAMES[userDataKey],
                                    inputStatus: 'success',
                                    //@ts-expect-error
                                    inputValue: userInfo[userDataKey] ?? '',
                                    inputType: 'text',
                                }
                            }),
                        }
                    });
                }
            })?.filter(item => item !== undefined) ?? [];

            this.componentForceUpdate();
        }
    }

    public async sendForm(): Promise<void> {
        let isAllFieldsValid = true;
        // @ts-ignore
        this.children.profileFormItems.forEach((item: { getValue: () => string; blockProps: { inputFieldRegExpPattern: string; isMandatory: boolean; }; }) => {
            if (isAllFieldsValid) {
                isAllFieldsValid = isValid(item.getValue(), item.blockProps.inputFieldRegExpPattern, item.blockProps.isMandatory)
            }
        })
        if (isAllFieldsValid) {
            // @ts-expect-error
            const values = this.children.profileFormItems.map((item) => [(item as InputField).getName(), (item as InputField).getValue()]);
            const data = Object.fromEntries(values) as ChangeUserProfileRequestData;

            await authController.updateUserInfo(data);
        }
    }
}
