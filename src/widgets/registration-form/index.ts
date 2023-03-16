import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./ui/registration-form.hbs";
import {isValid} from "~/shared/helpers/validate-helpers";
import { submitHandler } from "~/app/core/submit-handler";
import {BlockEvents} from "~/app/core/types";
import {InputField} from "~/shared/input-field";
import {Button} from "~/shared/button";

export type RegistrationFormProps = {
    blockEvents: BlockEvents
    blockPropsAndChildren: {
        registrationFormItems: InputField[],
        registrationFormButton: Button
    }
}
export class RegistrationForm extends Block<RegistrationFormProps> {

    submitHandler: typeof submitHandler;

    protected init() {
        super.init();

        this.submitHandler = submitHandler;
        this.submitHandler.subscribe('RegistrationFormSubmitted', this.navigate, this);
    }

    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }

    public navigate(): void {
        let isAllFieldsValid = true;
        if (Array.isArray(this.children.registrationFormItems)) {
            //@ts-ignore
            this.children.registrationFormItems.forEach((item: { getValue: () => string; blockProps: { inputFieldRegExpPattern: string; isMandatory: boolean; }; }) => {
                if (isAllFieldsValid) {
                    isAllFieldsValid = isValid(item.getValue(), item.blockProps.inputFieldRegExpPattern, item.blockProps.isMandatory)
                }
            })
        }
        if (isAllFieldsValid) {
            //@ts-ignore
            window.navigateByRoutes('Chat');
        }
    }
}
