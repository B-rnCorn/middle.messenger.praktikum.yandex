import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/load-file-modal-window.hbs';
import {Card} from "~/shared/card";
import {submitHandler} from "~/app/core/SubmitHandler";
import {BlockOwnProps} from "~/app/core/types";
import authController from "~/app/core/controllers/AuthController";

export type LoadFileModalWindowProps = {
    blockPropsAndChildren: {
        card: Card;
    }
}
export class LoadFileModalWindow extends Block<LoadFileModalWindowProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('OpenProfileImageModal', this.showModal, this);
        submitHandler.subscribe('CloseProfileImageModal', this.hide, this);
        submitHandler.subscribe('ProfileImageFormSubmitted', this.loadFileSubmitted, this);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    protected componentDidMount(oldProps: BlockOwnProps) {
        this.hide();
        super.componentDidMount(oldProps);
    }

    protected showModal() {
        this.show('flex')
    }

    protected async loadFileSubmitted(): Promise<void> {
        //@ts-expect-error
        const imageFile = (<HTMLInputElement> this.getContent()!.querySelector(`[name='avatar']`)).files[0];
        if (imageFile) {
            const formData = new FormData();

            formData.append('avatar', imageFile);

            await authController.updateUserAvatar(formData);
        }
    }
}
