import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./input-field.hbs";
import {isValid} from "~/shared/helpers/validate-helpers";
import { submitHandler } from "~/app/core/submit-handler";
import {BlockEvents} from "~/app/core/types";
import {Input} from "~/shared/input-field/input";

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

    submitHandler: typeof submitHandler;
    protected init() {
        if (!Array.isArray(this.children.input)) {
            this.children.input.blockEvents = {
                blur: () => this.isValid(),
            };
            this.children.input.eventBus().emit(Block.EVENTS.COMPONENT_DID_UPDATE);
        }
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
}
