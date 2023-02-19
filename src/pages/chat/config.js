import * as images from "../../app/images/image-urls";

export const chatConfig = {
    chatListItems: [
        {
            imageUrl: images.chatImageUrl,
            name: 'Андрей',
            lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus accusantium animi, architecto atque consequatur cupiditate ea est fugit id inventore iusto maiores maxime minus modi nam necessitatibus nesciunt nihil porro provident quasi rem sint sunt temporibus vel velit. Dignissimos optio quasi voluptates. Atque debitis ipsa modi odit quaerat.',
            lastMessageTime: '12:00',
        },
        {
            imageUrl: images.chatImageUrl,
            name: 'Общий чат',
            lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus accusantium animi, architecto atque consequatur cupiditate ea est fugit id inventore iusto maiores maxime minus modi nam necessitatibus nesciunt nihil porro provident quasi rem sint sunt temporibus vel velit. Dignissimos optio quasi voluptates. Atque debitis ipsa modi odit quaerat.',
            lastMessageTime: 'Пт',
            unreadMessageCount: 3,
        },
    ],
    activeChat: {
        imageUrl: images.chatImageUrl,
        name: 'Андрей',
    }
};