import * as images from "../../app/images/image-urls";

export const profileEditConfig = {
    imageUrl: images.chatImageUrl,
    profileFormItems: [
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
            inputFieldId: 'display_name',
            inputFieldName: 'display_name',
            inputFieldLabel: 'Имя в чате',
            inputFieldStatus: 'success',
            inputFieldValue: 'Имя в чате',
            inputFieldType: 'text',
        },
        {
            inputFieldId: 'email',
            inputFieldName: 'email',
            inputFieldLabel: 'Телефон',
            inputFieldStatus: 'success',
            inputFieldValue: '+7 (909) 967 30 30',
            inputFieldType: 'text',
        },
    ],
    profileFormButton: {
        buttonText: 'Сохранить',
        onClickAction: 'Profile',
        buttonType: 'submit'
    },
}
