import * as images from '~/images/image-urls';
import {ChatList} from '~/widgets/chat-list';
import {ChatListItem} from "~/entities/chat-list-item";
import {ChatContent} from "~/widgets/chat-content";

export const chatConfig = {
    blockPropsAndChildren: {
        chatList: new ChatList({
            blockPropsAndChildren: {
                chatListItems: [
                    new ChatListItem({
                        blockPropsAndChildren: {
                            imageUrl: images.chatImageUrl.toString(),
                            name: 'Андрей',
                            lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus accusantium animi, architecto atque consequatur cupiditate ea est fugit id inventore iusto maiores maxime minus modi nam necessitatibus nesciunt nihil porro provident quasi rem sint sunt temporibus vel velit. Dignissimos optio quasi voluptates. Atque debitis ipsa modi odit quaerat.',
                            lastMessageTime: '12:00',
                        }
                    }),
                    new ChatListItem({
                        blockPropsAndChildren: {
                            imageUrl: images.chatImageUrl.toString(),
                            name: 'Общий чат',
                            lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus accusantium animi, architecto atque consequatur cupiditate ea est fugit id inventore iusto maiores maxime minus modi nam necessitatibus nesciunt nihil porro provident quasi rem sint sunt temporibus vel velit. Dignissimos optio quasi voluptates. Atque debitis ipsa modi odit quaerat.',
                            lastMessageTime: 'Пт',
                            unreadMessageCount: 3,
                        }
                    }),
                ],
            }
        }),
        activeChat: new ChatContent({
            blockPropsAndChildren: {
                imageUrl: images.chatImageUrl.toString(),
                name: 'Андрей',
            }
        })
    }
};
