import * as images from "~/images/image-urls";
import {NavigateBack} from "~/features/navigate-back";
import {ProfileInformationEditForm} from "~/widgets/profile-information-edit-form";
import {Button} from "~/shared/button";
import {ProfileEditProps} from "~/pages/profile-edit";
import {Router, Routes} from "~/app/core/router";
import {submitHandler} from "~/app/core/SubmitHandler";
import {Card} from "~/shared/card";
import {LoadFile} from "~/features/load-file";
import {LoadFileModalWindow} from "~/widgets/load-file-modal-window";
import {IconButton} from "~/shared/icon-button";
import {ImgLoadIcon} from "~/shared/img-load-icon";
import {Input} from "~/shared/input";

export const profileEditConfig: ProfileEditProps = {
    blockPropsAndChildren: {
        profileInformationEditForm: new ProfileInformationEditForm({
            blockEvents: {
                submit: function (event: Event): void {
                    event.preventDefault();
                    submitHandler.publish('ProfileInformationFormSubmitted');
                }
            },
            blockPropsAndChildren: {
                imageLoadIcon: new ImgLoadIcon({
                    blockEvents: {
                        click: function (): void {
                            submitHandler.publish('OpenProfileImageModal');
                        }
                    },
                    blockPropsAndChildren: {
                        imageUrl: images.chatImageUrl.toString(),
                    }
                }),
                profileFormItems: [],
                profileFormButton: new Button({
                    blockPropsAndChildren: {
                        buttonText: 'Сохранить',
                        buttonType: 'submit'
                    }
                }),
            }
        }),
        navigateBack: new NavigateBack({
            blockEvents: {
                click: function (): void {
                    Router.getInstance().go(Routes.Profile);
                }
            },
            blockPropsAndChildren: {}
        }),
        loadFileModalWindow: new LoadFileModalWindow({
            blockPropsAndChildren: {
                card: new Card({
                    blockPropsAndChildren: {
                        header: 'Загрузите файл',
                        body: [
                            new LoadFile({
                                blockEvents: {
                                    submit: function (e: SubmitEvent): void {
                                        e.preventDefault();
                                        submitHandler.publish('ProfileImageFormSubmitted');
                                    }
                                },
                                blockPropsAndChildren: {
                                    inputFieldLabel: 'Выберите файл на компьютере',
                                    inputFieldId: 'avatar',
                                    inputField: new Input({
                                        blockEvents: {
                                            /*input: function (): void {
                                                //submitHandler.publish('ProfileImageFormSubmitted');
                                            }*/
                                        },
                                        blockPropsAndChildren: {
                                            inputId: 'avatar',
                                            inputName: 'avatar',
                                            inputType: 'file',
                                        }
                                    }),
                                    submitButton: new Button({
                                        blockPropsAndChildren: {
                                            buttonText: 'Принять',
                                            //buttonValidationText: 'Необходимо выбрать файл',
                                            //onClickAction: 'Profile',
                                            buttonType: 'submit'
                                        }
                                    }),
                                }
                            }),
                            new IconButton({
                                blockEvents: {
                                    click: function (): void {
                                        submitHandler.publish('CloseProfileImageModal');
                                    }
                                },
                                blockPropsAndChildren: {
                                    iconUrl: images.closeCrossUrl.toString(),
                                    altText: 'close_icon',
                                    cssClassName: 'load-file-modal-window__close'
                                }
                            })
                        ],
                    }
                })
            },
        }),
    }
}
