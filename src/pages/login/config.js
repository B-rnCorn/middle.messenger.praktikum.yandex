export const loginConfig = {
    cardContent: {
        header: 'Вход',
        body: {
            loginFormItems: [
                {
                    inputFieldId: 'login',
                    inputFieldName: 'login',
                    inputFieldLabel: 'Логин',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'examplelogin',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'password',
                    inputFieldName: 'password',
                    inputFieldLabel: 'Пароль',
                    inputFieldStatus: 'error',
                    inputFieldValue: 'qwe',
                    inputFieldType: 'password',
                    inputFieldErrorText: 'Длина должна быть более 6 символов'
                }
            ],
            loginFormButton: {
                buttonText: 'Авторизоваться',
                buttonAlternativeNavigationText: 'Нет аккаунта?',
                buttonAlternativeNavigationRoute: 'Registration',
                onClickAction: 'Chat',
                buttonType: 'submit'
            },
        },
    }
}
