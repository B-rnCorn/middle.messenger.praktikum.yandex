import {Block} from "~/app/core/Block";
import {submitHandler} from "~/app/core/SubmitHandler";
//@ts-expect-error
import template from "./ui/login-form.hbs";
import {isValid} from "~/shared/helpers/validate-helpers";
import {BlockEvents} from "~/app/core/types";
import {InputField} from "~/shared/input-field";
import {Button} from "~/shared/button";
import AuthController from "~/app/core/controllers/AuthController";
import {SigninData} from "~/app/core/api/AuthAPI";
import withControllers from "~/app/core/providers/withControllers";

export type LoginFormProps = {
    blockEvents: BlockEvents
    blockPropsAndChildren: {
        loginFormItems: InputField[],
        loginFormButton: Button
    }
}

class LoginForm extends Block<LoginFormProps> {

    submitHandler: typeof submitHandler;

    protected init() {
        super.init();

        this.submitHandler = submitHandler;
        this.submitHandler.subscribe('LoginFormSubmitted', this.sendForm, this);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }

    public sendForm(): void {
        let isAllFieldsValid = true;
        // @ts-ignore
        this.children.loginFormItems.forEach((item: { getValue: () => string; blockProps: { inputFieldRegExpPattern: string; isMandatory: boolean; }; }) => {
            if (isAllFieldsValid) {
                isAllFieldsValid = isValid(item.getValue(), item.blockProps.inputFieldRegExpPattern, item.blockProps.isMandatory)
            }
        })
        if (isAllFieldsValid) {
            // @ts-expect-error
            const values = this.children.loginFormItems.map((item) => [(item as InputField).getName(), (item as InputField).getValue()]);
            const data = Object.fromEntries(values) as SigninData;

            this.blockProps.controllers.auth.signin(data);
        }
    }
}

export default withControllers(LoginForm, {auth: AuthController});
