export const registrationConfig = {
    cardContent: {
        header: 'Вход',
        body: {
            registrationFormItems: [
                {
                    inputFieldId: 'email',
                    inputFieldLabel: 'Почта',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'example@mailbox.com',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'login',
                    inputFieldLabel: 'Логин',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'examplelogin',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'first_name',
                    inputFieldLabel: 'Имя',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'Имя',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'second_name',
                    inputFieldLabel: 'Фамилия',
                    inputFieldStatus: 'success',
                    inputFieldValue: 'Фамилия',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'phone',
                    inputFieldLabel: 'Телефон',
                    inputFieldStatus: 'success',
                    inputFieldValue: '+7 (909) 967 30 30',
                    inputFieldType: 'text',
                },
                {
                    inputFieldId: 'password',
                    inputFieldLabel: 'Пароль',
                    inputFieldStatus: 'error',
                    inputFieldValue: 'qwerty123',
                    inputFieldType: 'password',
                    inputFieldErrorText: 'Пароли не совпадают'
                },
                {
                    inputFieldId: 'password_repeat',
                    inputFieldLabel: 'Пароль ещё раз',
                    inputFieldStatus: 'error',
                    inputFieldValue: 'qwe',
                    inputFieldType: 'qwerty124',
                    inputFieldErrorText: 'Пароли не совпадают'
                }
            ]
        },
        button: {
            buttonText: 'Регистрация',
            buttonAlternativeNavigationText: 'Войти',
            buttonAlternativeNavigationRoute: 'Login',
            onClickAction: 'Login'
        },
    }
}