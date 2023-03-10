import {Block} from "~/app/core/Block";
// @ts-ignore
import template from "./ui/error-page-content.hbs";

export type ErrorPageContentProps = {
    blockPropsAndChildren: {
        errorCode: string,
        errorMessage: string
    }
}

export class ErrorPageContent extends Block<ErrorPageContentProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
