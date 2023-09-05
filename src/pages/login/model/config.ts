import {Card} from "~/shared/card";
import LoginForm from "~/widgets/login-form";
import {InputField} from "~/shared/input-field";
import {Button} from "~/shared/button";
import {Input} from "~/shared/controlled-input";
import {REGULAR_EXPRESSION_PATTERNS, REGULAR_EXPRESSION_VALIDATION_TEXT} from "~/shared/constants";
import {submitHandler} from "~/app/core/SubmitHandler";
import {LoginPageProps} from "~/pages/login";
import {AltNav} from "~/shared/button/alt-nav";
import {Router, Routes} from "~/app/core/router";

export const loginConfig: LoginPageProps = {
    tagName: 'div',
    blockPropsAndChildren: {
        cardContent: new Card({
            tagName: 'div',
            blockPropsAndChildren: {
                header: 'Вход',
                body: new LoginForm({
                    blockEvents: {
                        submit: function (event: Event): void {
                            event.preventDefault();
                            submitHandler.publish('LoginFormSubmitted');
                        }
                    },
                    blockPropsAndChildren: {
                        loginFormItems: [
                            new InputField({
                                blockPropsAndChildren: {
                                    inputFieldId: 'login',
                                    inputFieldName: 'login',
                                    inputFieldLabel: 'Логин',
                                    inputFieldRegExpPattern: REGULAR_EXPRESSION_PATTERNS.login,
                                    inputFieldErrorText: REGULAR_EXPRESSION_VALIDATION_TEXT.login,
                                    isInputFieldValid: true,
                                    isMandatory: true,
                                    isFormInput: true,
                                    submitEventName: 'LoginFormSubmitted',
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
                                    inputFieldId: 'password',
                                    inputFieldName: 'password',
                                    inputFieldLabel: 'Пароль',
                                    inputFieldRegExpPattern: REGULAR_EXPRESSION_PATTERNS.password,
                                    inputFieldErrorText: REGULAR_EXPRESSION_VALIDATION_TEXT.password,
                                    isInputFieldValid: true,
                                    isMandatory: true,
                                    isFormInput: true,
                                    submitEventName: 'LoginFormSubmitted',
                                    input: new Input({
                                        blockPropsAndChildren: {
                                            inputId: 'password',
                                            inputStatus: 'success',
                                            inputName: 'password',
                                            inputValue: '',
                                            inputType: 'password',
                                        }
                                    }),
                                }
                            })
                        ],
                        loginFormButton: new Button({
                            blockPropsAndChildren: {
                                buttonText: 'Авторизоваться',
                                altNav: new AltNav({
                                    blockEvents: {
                                        click: () => Router.getInstance().go(Routes.Registration),
                                    },
                                    blockPropsAndChildren: {
                                        buttonAlternativeNavigationText: 'Нет аккаунта?'
                                    },
                                }),
                                buttonType: 'submit'
                            }
                        }),
                    }
                })
            },
        }),
    }
}
