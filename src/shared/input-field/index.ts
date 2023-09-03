import {Block} from "~/app/core/Block";
import template from "./input-field.hbs";
import {isValid} from "~/shared/helpers/validate-helpers";
import { submitHandler } from "~/app/core/SubmitHandler";
import {BlockEvents} from "~/app/core/types";
import {Input} from "~/shared/controlled-input";

type InputFieldProps = {
    tagName?: string;
    isNeedInternalId?: boolean;
    id?: string;
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        inputFieldId: string,
        inputFieldName: string,
        inputFieldLabel: string,
        inputFieldRegExpPattern: string,
        inputFieldErrorText: string,
        isInputFieldValid: boolean,
        isMandatory: boolean,
        isFormInput: boolean,
        submitEventName?: string,
        input: Input,
    }
}
export class InputField extends Block<InputFieldProps> {

    protected init() {
        //this.eventBus().emit(Block.EVENTS.COMPONENT_DID_RENDER);

        console.log(this.eventBus);

        if (this.blockProps.isFormInput && this.blockProps.submitEventName) {
            submitHandler.subscribe(this.blockProps.submitEventName, this.isValid, this);
        }
    }

    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }

    isValid(): void {
        const isInputValid = isValid(this.getValue(), this.blockProps.inputFieldRegExpPattern, this.blockProps.isMandatory);
        if (!Array.isArray(this.children.input)) {
            if (isInputValid) {
                this.children.input.setProps({
                    ...this.children.input.blockProps,
                    inputStatus: 'success',
                    inputValue: this.getValue().trim()
                });
                this.setProps({...this.blockProps, isInputFieldValid: true});
            } else {
                this.children.input.setProps({
                    ...this.children.input.blockProps,
                    inputStatus: 'error',
                    inputValue: this.getValue().trim()
                });
                this.setProps({...this.blockProps, isInputFieldValid: false});
            }
        }
    }

    getValue(): string {
        return (<HTMLInputElement> this.getContent()!.querySelector(`[name=${this.blockProps.inputFieldName}]`)).value;
    }

    getName(): string {
        return this.blockProps.inputFieldName;
    }
}
