import * as images from "~/images/image-urls";
import {NavigateBack} from "~/features/navigate-back";
import {ProfileInformationEditForm} from "~/widgets/profile-information-edit-form";
import {Button} from "~/shared/button";
import {InputField} from "~/shared/input-field";
import {regularExpressionPatterns, regularExpressionValidationText} from "~/shared/constants";
import {Input} from "~/shared/input-field/input";
import {ProfileEditProps} from "~/pages/profile-edit";

export const profileEditConfig: ProfileEditProps = {
    blockPropsAndChildren: {
        profileInformationEditForm: new ProfileInformationEditForm({
            blockPropsAndChildren: {
                imageUrl: images.chatImageUrl.toString(),
                profileFormItems: [
                    new InputField({
                        blockPropsAndChildren: {
                            inputFieldId: 'email',
                            inputFieldName: 'email',
                            inputFieldLabel: 'Почта',
                            inputFieldRegExpPattern: regularExpressionPatterns.email,
                            inputFieldErrorText: regularExpressionValidationText.email,
                            isInputFieldValid: true,
                            isMandatory: true,
                            isFormInput: false,
                            input: new Input({
                                blockPropsAndChildren: {
                                    inputId: 'email',
                                    inputName: 'email',
                                    inputStatus: 'success',
                                    inputValue: 'example@mailbox.com',
                                    inputType: 'text',
                                }
                            }),
                        }
                    }),
                    new InputField({
                        blockPropsAndChildren: {
                            inputFieldId: 'login',
                            inputFieldName: 'login',
                            inputFieldLabel: 'Логин',
                            inputFieldRegExpPattern: regularExpressionPatterns.login,
                            inputFieldErrorText: regularExpressionValidationText.login,
                            isInputFieldValid: true,
                            isMandatory: true,
                            isFormInput: false,
                            input: new Input({
                                blockPropsAndChildren: {
                                    inputId: 'login',
                                    inputName: 'login',
                                    inputStatus: 'success',
                                    inputValue: 'login',
                                    inputType: 'text',
                                }
                            }),
                        }
                    }),
                    new InputField({
                        blockPropsAndChildren: {
                            inputFieldId: 'first_name',
                            inputFieldName: 'first_name',
                            inputFieldLabel: 'Имя',
                            inputFieldRegExpPattern: regularExpressionPatterns.firstName,
                            inputFieldErrorText: regularExpressionValidationText.firstName,
                            isInputFieldValid: true,
                            isMandatory: true,
                            isFormInput: false,
                            input: new Input({
                                blockPropsAndChildren: {
                                    inputId: 'first_name',
                                    inputName: 'first_name',
                                    inputStatus: 'success',
                                    inputValue: '',
                                    inputType: 'text',
                                }
                            }),
                        }
                    }),
                    new InputField({
                        blockPropsAndChildren: {
                            inputFieldId: 'second_name',
                            inputFieldName: 'second_name',
                            inputFieldLabel: 'Фамилия',
                            inputFieldRegExpPattern: regularExpressionPatterns.firstName,
                            inputFieldErrorText: regularExpressionValidationText.firstName,
                            isInputFieldValid: true,
                            isMandatory: true,
                            isFormInput: false,
                            input: new Input({
                                blockPropsAndChildren: {
                                    inputId: 'second_name',
                                    inputName: 'second_name',
                                    inputStatus: 'success',
                                    inputValue: '',
                                    inputType: 'text',
                                }
                            }),
                        }
                    }),
                    new InputField({
                        blockPropsAndChildren: {
                            inputFieldId: 'display_name',
                            inputFieldName: 'display_name',
                            inputFieldLabel: 'Имя в чате',
                            inputFieldRegExpPattern: regularExpressionPatterns.displayName,
                            inputFieldErrorText: regularExpressionValidationText.firstName,
                            isInputFieldValid: true,
                            isMandatory: true,
                            isFormInput: false,
                            input: new Input({
                                blockPropsAndChildren: {
                                    inputId: 'display_name',
                                    inputName: 'display_name',
                                    inputStatus: 'success',
                                    inputValue: '',
                                    inputType: 'text',
                                }
                            }),
                        }
                    }),
                    new InputField({
                        blockPropsAndChildren: {
                            inputFieldId: 'phone',
                            inputFieldName: 'phone',
                            inputFieldLabel: 'Телефон',
                            inputFieldRegExpPattern: regularExpressionPatterns.firstName,
                            inputFieldErrorText: regularExpressionValidationText.firstName,
                            isInputFieldValid: true,
                            isMandatory: true,
                            isFormInput: false,
                            input: new Input({
                                blockPropsAndChildren: {
                                    inputId: 'phone',
                                    inputName: 'phone',
                                    inputStatus: 'success',
                                    inputValue: '+79228084947',
                                    inputType: 'text',
                                }
                            }),
                        }
                    }),
                ],
                profileFormButton: new Button({
                    blockPropsAndChildren: {
                        buttonText: 'Сохранить',
                        onClickAction: 'Profile',
                        buttonType: 'submit'
                    }
                }),
            }
        }),
        navigateBack: new NavigateBack({
            blockPropsAndChildren: {}
        }),
    }
}
