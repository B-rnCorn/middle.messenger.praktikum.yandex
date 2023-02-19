import * as images from "../../app/images/image-urls";

export const profileConfig = {
    nameInChat: 'Имя в чате',
    imageUrl: images.chatImageUrl,
    profileInfoItems: [
        {
            itemName: 'Почта',
            itemValue: 'example@mailbox.com',
        },
        {
            itemName: 'Логин',
            itemValue: 'examplelogin',
        },
        {
            itemName: 'Имя',
            itemValue: 'Имя',
        },
        {
            itemName: 'Фамилия',
            itemValue: 'Фамилия',
        },
        {
            itemName: 'Имя в чате',
            itemValue: 'Имя в чате',
        },
        {
            itemName: 'Телефон',
            itemValue: '+7 (909) 967 30 30',
        },
    ],
    profileInfoActions: [
        {
            actionName: 'Изменить данные',
        },
        {
            actionName: 'Изменить пароль',
        },
        {
            actionName: 'Выйти',
            route: 'Login'
        }
    ]
}