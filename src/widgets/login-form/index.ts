import {Block} from "~/app/core/Block";
import {submitHandler} from "~/app/core/submit-handler";
//@ts-ignore
import template from "./ui/login-form.hbs";
import {isValid} from "~/shared/helpers/validate-helpers";
import {BlockEvents} from "~/app/core/types";
import {InputField} from "~/shared/input-field";
import {Button} from "~/shared/button";

export type LoginFormProps = {
    blockEvents: BlockEvents
    blockPropsAndChildren: {
        loginFormItems: InputField[],
        loginFormButton: Button
    }
}

export class LoginForm extends Block<LoginFormProps> {

    submitHandler: typeof submitHandler;

    protected init() {
        super.init();

        this.submitHandler = submitHandler;
        this.submitHandler.subscribe('LoginFormSubmitted', this.navigate, this);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    public navigate(): void {
        let isAllFieldsValid = true;
        // @ts-ignore
        this.children.loginFormItems.forEach((item: { getValue: () => string; blockProps: { inputFieldRegExpPattern: string; isMandatory: boolean; }; }) => {
            if (isAllFieldsValid) {
                isAllFieldsValid = isValid(item.getValue(), item.blockProps.inputFieldRegExpPattern, item.blockProps.isMandatory)
            }
        })
        if (isAllFieldsValid) {
            //@ts-ignore
            window.navigateByRoutes('Chat');
        }
    }
}
