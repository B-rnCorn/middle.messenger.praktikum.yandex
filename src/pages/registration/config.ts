export const registrationConfig = {
    cardContent: {
        header: 'Вход',
        body: {
            registrationFormItems: [
                {
                    inputFieldId: 'email',
                    inputFieldName: 'email',
                    inputFieldLabel: 'Почта',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'example@mailbox.com',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'login',
                    inputFieldName: 'login',
                    inputFieldLabel: 'Логин',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'examplelogin',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'first_name',
                    inputFieldName: 'first_name',
                    inputFieldLabel: 'Имя',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'Имя',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'second_name',
                    inputFieldName: 'second_name',
                    inputFieldLabel: 'Фамилия',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'Фамилия',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'phone',
                    inputFieldName: 'phone',
                    inputFieldLabel: 'Телефон',
                    inputFieldStatus: 'success',
                    inputFieldValue: '+7 (909) 967 30 30',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'password',
                    inputFieldName: 'password',
                    inputFieldLabel: 'Пароль',
                    inputFieldStatus: 'error',
                    inputFieldValue: 'qwerty123',
                    inputFieldType: 'password',
                    inputFieldErrorText: 'Пароли не совпадают'
                },
                {
                    inputFieldId: 'password_repeat',
                    inputFieldName: 'password_repeat',
                    inputFieldLabel: 'Пароль ещё раз',
                    inputFieldStatus: 'error',
                    inputFieldValue: 'qwe',
                    inputFieldType: 'qwerty124',
                    inputFieldErrorText: 'Пароли не совпадают'
                }
            ],
            registrationFormButton: {
                buttonText: 'Регистрация',
                buttonAlternativeNavigationText: 'Войти',
                buttonAlternativeNavigationRoute: 'Login',
                buttonType: 'submit',
                onClickAction: 'Login'
            },
        },
    }
}
