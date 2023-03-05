import {Card} from "~/shared/card";
import {RegistrationForm} from "~/widgets/registration-form";
import {InputField} from "~/shared/input-field";
import {Input} from "~/shared/input-field/input";
import {regularExpressionPatterns, regularExpressionValidationText} from "~/shared/constants";
import {Button} from "~/shared/button";
import {submitHandler} from "~/app/core/submit-handler";

export const registrationConfig = {
    blockPropsAndChildren: {
        cardContent: new Card({
            blockPropsAndChildren: {
                header: 'Регистрация',
                body: new RegistrationForm({
                    blockEvents: {
                        submit: function (event: Event): void {
                            event.preventDefault();
                            submitHandler.publish('RegistrationFormSubmitted');
                        }
                    },
                    blockPropsAndChildren: {
                        registrationFormItems: [
                            new InputField({
                                blockPropsAndChildren: {
                                    inputFieldId: 'email',
                                    inputFieldName: 'email',
                                    inputFieldLabel: 'Почта',
                                    inputFieldRegExpPattern: regularExpressionPatterns.email,
                                    inputFieldErrorText: regularExpressionValidationText.email,
                                    isInputFieldValid: true,
                                    isMandatory: true,
                                    isFormInput: true,
                                    submitEventName: 'RegistrationFormSubmitted',
                                    input: new Input({
                                        blockPropsAndChildren: {
                                            inputId: 'email',
                                            inputName: 'email',
                                            inputStatus: 'success',
                                            inputValue: '',
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
                                    isFormInput: true,
                                    submitEventName: 'RegistrationFormSubmitted',
                                    input: new Input({
                                        blockPropsAndChildren: {
                                            inputId: 'login',
                                            inputName: 'login',
                                            inputStatus: 'success',
                                            inputValue: '',
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
                                    isFormInput: true,
                                    submitEventName: 'RegistrationFormSubmitted',
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
                                    isFormInput: true,
                                    submitEventName: 'RegistrationFormSubmitted',
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
                                    inputFieldId: 'phone',
                                    inputFieldName: 'phone',
                                    inputFieldLabel: 'Телефон',
                                    inputFieldRegExpPattern: regularExpressionPatterns.firstName,
                                    inputFieldErrorText: regularExpressionValidationText.firstName,
                                    isInputFieldValid: true,
                                    isMandatory: true,
                                    isFormInput: true,
                                    submitEventName: 'RegistrationFormSubmitted',
                                    input: new Input({
                                        blockPropsAndChildren: {
                                            inputId: 'phone',
                                            inputName: 'phone',
                                            inputStatus: 'success',
                                            inputValue: '',
                                            inputType: 'text',
                                        }
                                    }),
                                }
                            }),
                            new InputField({
                                blockPropsAndChildren: {
                                    inputFieldId: 'password',
                                    inputFieldName: 'password',
                                    inputFieldLabel: 'Пароль',
                                    inputFieldRegExpPattern: regularExpressionPatterns.firstName,
                                    inputFieldErrorText: regularExpressionValidationText.firstName,
                                    isInputFieldValid: true,
                                    isMandatory: true,
                                    isFormInput: true,
                                    submitEventName: 'RegistrationFormSubmitted',
                                    input: new Input({
                                        blockPropsAndChildren: {
                                            inputId: 'password',
                                            inputName: 'password',
                                            inputStatus: 'success',
                                            inputValue: '',
                                            inputType: 'password',
                                        }
                                    }),
                                }
                            }),
                            new InputField({
                                blockPropsAndChildren: {
                                    inputFieldId: 'password_repeat',
                                    inputFieldName: 'password_repeat',
                                    inputFieldLabel: 'Пароль ещё раз',
                                    inputFieldRegExpPattern: regularExpressionPatterns.firstName,
                                    inputFieldErrorText: regularExpressionValidationText.firstName,
                                    isInputFieldValid: true,
                                    isMandatory: true,
                                    isFormInput: true,
                                    submitEventName: 'RegistrationFormSubmitted',
                                    input: new Input({
                                        blockPropsAndChildren: {
                                            inputId: 'password_repeat',
                                            inputName: 'password_repeat',
                                            inputStatus: 'success',
                                            inputValue: '',
                                            inputType: 'text',
                                        }
                                    }),
                                }
                            })
                        ],
                        registrationFormButton: new Button({
                            blockPropsAndChildren: {
                                buttonText: 'Регистрация',
                                buttonAlternativeNavigationText: 'Войти',
                                buttonAlternativeNavigationRoute: 'Login',
                                buttonType: 'submit',
                                onClickAction: 'Login'
                            }
                        }),
                    }
                }),
            },
        }),
    }
}
