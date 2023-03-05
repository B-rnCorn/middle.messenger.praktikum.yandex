import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./input-field.hbs";
import {isValid} from "~/shared/helpers/validate-helpers";
import { submitHandler } from "~/app/core/submit-handler";

export class InputField extends Block {

    submitHandler: typeof submitHandler;
    protected init() {
        //@ts-ignore
        this.children.input.blockEvents = {
            blur: () => this.isValid(),
        };
        //@ts-ignore TODO: Пофиксить обновление компонента при обновлении пропсов
        this.children.input.eventBus().emit(Block.EVENTS.COMPONENT_DID_UPDATE);
        this.eventBus().emit(Block.EVENTS.COMPONENT_DID_RENDER);

        this.submitHandler = submitHandler;
        if (this.blockProps.isFormInput) {
            this.submitHandler.subscribe(this.blockProps.submitEventName, this.isValid, this);
        }
    }

    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }

    isValid(): void {
        const isInputValid = isValid(this.getValue(), this.blockProps.inputFieldRegExpPattern, this.blockProps.isMandatory);
        if (isInputValid) {
            // @ts-ignore
            this.children.input.setProps({...this.children.input.blockProps, inputStatus: 'success', inputValue: this.getValue().trim()});
            //@ts-ignore
            this.setProps({...this.blockProps, isInputFieldValid: true});
        } else {
            // @ts-ignore
            this.children.input.setProps({...this.children.input.blockProps, inputStatus: 'error', inputValue: this.getValue().trim()});
            //@ts-ignore
            this.setProps({...this.blockProps, isInputFieldValid: false});
        }
    }

    getValue(): string {
        return (<HTMLInputElement> this.getContent()!.querySelector(`[name=${this.blockProps.inputFieldName}]`)).value;
    }
}
