import {ChatList} from '~/widgets/chat-list';
import {ChatContent} from "~/widgets/chat-content";
import {ChatPageProps} from "~/pages/chat";
import {ChatSearch} from "~/entities/chat-search";
import {MessageForm} from "~/features/message-form";
import {submitHandler} from "~/app/core/SubmitHandler";
import {Input} from "~/shared/input";
import {ProfileNavigateButton} from "~/features/profile-navigate-button";
import {Router, Routes} from "~/app/core/router";
import {IconButton} from "~/shared/icon-button";
import {CreateChatModalWindow} from "~/widgets/create-chat-modal-window";
import {Card} from "~/shared/card";
import {Button} from "~/shared/button";
import {Label} from "~/shared/label";
import {MenuItem} from "~/entities/menu-item";
import {EditChatMembersModal} from "~/widgets/edit-chat-members-modal";
import {UserList} from "~/features/user-list";
import ChatController from "~/app/core/controllers/ChatController";
import store from "~/app/core/store/Store";
import {SearchSelect} from "~/shared/search-select";

export const chatConfig: ChatPageProps = {
    tagName: 'div',
    blockPropsAndChildren: {
        chatList: new ChatList({
            blockPropsAndChildren: {
                search: new ChatSearch({
                    blockPropsAndChildren: {
                        searchIconUrl: '',
                        addChatButton: new IconButton({
                            blockEvents: {
                                click: function (): void {
                                    submitHandler.publish('CreateChatIconClick');
                                }
                            },
                            blockPropsAndChildren: {
                                iconUrl: 'https://icons8.com/icon/1501/plus',
                                cssClassName: 'chat-search__plus-icon',
                                altText: 'addChatIcon',
                            },
                        }),
                    }
                }),
                chatListItems: [],
                profileNavigateButton: new ProfileNavigateButton({
                    blockPropsAndChildren: {},
                    blockEvents: {
                        click: function (): void {
                            setTimeout(()=> submitHandler.publish('NavigateToProfile'), 1000);
                            Router.getInstance().go(Routes.Profile);
                        }
                    }
                }),
            }
        }),
        activeChat: new ChatContent({
            blockPropsAndChildren: {
                imageUrl: 'https://icons8.com/icon/111473/person',
                name: '',
                chatMessages: [],
                menuItems: [
                    new MenuItem({
                        blockEvents: {
                            click: function (): void {
                                const selectedChatId = store.getState()?.selectedChatId;
                                selectedChatId && ChatController.getChatUsers(selectedChatId);
                                setTimeout(()=> submitHandler.publish('ChatMembersListUpdate'), 1000);
                                submitHandler.publish('EditChatMembersClick');
                            }
                        },
                        blockPropsAndChildren: {
                            text: 'Редактировать участников'
                        }
                    }),
                    new MenuItem({
                        blockEvents: {
                            click: function (): void {
                                const selectedChatId = store.getState()?.selectedChatId;
                                selectedChatId && ChatController.deleteChat(selectedChatId);
                            }
                        },
                        blockPropsAndChildren: {
                            text: 'Удалить чат'
                        }
                    }),
                ],
                messageForm: new MessageForm({
                    blockEvents: {
                        submit: function (event: Event): void {
                            event.preventDefault();
                            submitHandler.publish('MessageFormSubmitted');
                        }
                    },
                    blockPropsAndChildren: {
                        inputFieldName: 'messageInput',
                        messageFormInput: new Input({
                            blockPropsAndChildren: {
                                inputId: 'messageInput',
                                inputStyleCLass: 'message-form__input',
                                inputName: 'messageInput',
                                inputValue: '',
                                inputType: 'text',
                            }
                        }),
                    },
                }),
            }
        }),
        createChatModal: new CreateChatModalWindow({
            blockPropsAndChildren: {
                inputFieldName: 'chatName',
                card: new Card({
                    blockPropsAndChildren: {
                        header: 'Создание чата',
                        body: [
                            new Label({
                                blockPropsAndChildren: {
                                    inputId: 'chatName',
                                    text: 'Введите название нового чата',
                                }
                            }),
                            new Input({
                                blockPropsAndChildren: {
                                    inputId: 'chatName',
                                    inputStyleCLass: 'create-chat-modal-window__input',
                                    inputName: 'chatName',
                                    inputValue: '',
                                    inputType: 'text',
                                }
                            }),
                            new Button({
                                blockEvents: {
                                    click: function (): void {
                                        submitHandler.publish('CreateChatSubmitted');
                                    }
                                },
                                blockPropsAndChildren: {
                                    buttonText: 'Создать',
                                    buttonType: 'submit'
                                }
                            }),
                            new IconButton({
                                blockEvents: {
                                    click: function (): void {
                                        submitHandler.publish('CloseCreateChatModal');
                                    }
                                },
                                blockPropsAndChildren: {
                                    iconUrl: '',
                                    altText: 'close_icon',
                                    cssClassName: 'create-chat-modal-window__close'
                                }
                            })
                        ],
                    }
                }),
            }
        }),
        editChatMembersModal: new EditChatMembersModal({
            blockPropsAndChildren: {
                inputFieldName: 'userName',
                card: new Card({
                    blockPropsAndChildren: {
                        header: 'Редактирование участников в чате',
                        body: [
                            new Label({
                                blockPropsAndChildren: {
                                    inputId: 'userName',
                                    text: 'Введите логин для поиска пользователей',
                                }
                            }),
                            new SearchSelect({
                                blockEvents: {},
                                blockPropsAndChildren: {
                                    inputField: new Input({
                                        blockEvents: {
                                            input: function (): void {
                                                submitHandler.publish('SearchMembersSubmitted');
                                            }
                                        },
                                        blockPropsAndChildren: {
                                            inputId: 'userName',
                                            inputStyleCLass: 'edit-chat-members-modal__input',
                                            inputName: 'userName',
                                            inputValue: '',
                                            inputType: 'text',
                                        }
                                    }),
                                    menuItems: [],
                                }
                            }),
                            new UserList({
                                blockPropsAndChildren: {
                                    userListItems: [],
                                }
                            }),
                            new IconButton({
                                blockEvents: {
                                    click: function (): void {
                                        submitHandler.publish('CloseEditChatMembersModal');
                                    }
                                },
                                blockPropsAndChildren: {
                                    iconUrl: '',
                                    altText: 'close_icon',
                                    cssClassName: 'edit-chat-members-modal__close'
                                }
                            })
                        ],
                    }
                }),
            }
        }),
    }
};
