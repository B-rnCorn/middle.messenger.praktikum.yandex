import {BlockProps} from "~/app/core/types";
import {Card} from "~/shared/card";
import {LoadFile} from "~/features/load-file";
import {Button} from "~/shared/button";

export const loadFileModalConfig: BlockProps = {
    blockPropsAndChildren: {
        cardContent: new Card({
            blockPropsAndChildren: {
                header: 'Загрузите файл',
                body: new LoadFile({
                    blockPropsAndChildren: {
                        inputFieldId: 'avatar',
                        inputFieldName: 'avatar',
                        inputFieldLabel: 'Выберите файл на компьютере',
                        inputFieldType: 'file',
                        submitButton: new Button({
                            blockPropsAndChildren: {
                                buttonText: 'Принять',
                                buttonValidationText: 'Необходимо выбрать файл',
                                onClickAction: 'Profile',
                                buttonType: 'submit'
                            }
                        }),
                    }
                }),
            }
        })
    },
}
