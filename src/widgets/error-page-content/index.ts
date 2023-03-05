import {Block} from "~/app/core/Block";
// @ts-ignore
import template from "./ui/error-page-content.hbs";

export class ErrorPageContent extends Block {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
