import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./ui/registration-form.hbs";
import {isValid} from "~/shared/helpers/validate-helpers";
import { submitHandler } from "~/app/core/SubmitHandler";
import {BlockEvents} from "~/app/core/types";
import {InputField} from "~/shared/input-field";
import {Button} from "~/shared/button";
import withControllers from "~/app/core/providers/withControllers";
import AuthController from "~/app/core/controllers/AuthController";
import {SignupData} from "~/app/core/api/AuthAPI";

export type RegistrationFormProps = {
    blockEvents: BlockEvents
    blockPropsAndChildren: {
        registrationFormItems: InputField[],
        registrationFormButton: Button
    }
}
class RegistrationForm extends Block<RegistrationFormProps> {

    submitHandler: typeof submitHandler;

    protected init() {
        super.init();

        this.submitHandler = submitHandler;
        this.submitHandler.subscribe('RegistrationFormSubmitted', this.sendForm, this);
    }

    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }

    public sendForm(): void {
        let isAllFieldsValid = true;
        // @ts-ignore
        this.children.registrationFormItems.forEach((item: { getValue: () => string; blockProps: { inputFieldRegExpPattern: string; isMandatory: boolean; }; }) => {
            if (isAllFieldsValid) {
                isAllFieldsValid = isValid(item.getValue(), item.blockProps.inputFieldRegExpPattern, item.blockProps.isMandatory)
            }
        })
        if (isAllFieldsValid) {
            // @ts-expect-error
            const values = this.children.registrationFormItems.filter(item => (item as InputField).getName() !== 'password_repeat').map((item) => [(item as InputField).getName(), (item as InputField).getValue()]);
            const data = Object.fromEntries(values) as SignupData;

            this.blockProps.controllers.auth.signup(data);
        }
    }
}

export default withControllers(RegistrationForm, {auth: AuthController});
