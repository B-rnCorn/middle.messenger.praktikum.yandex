import {Block} from '~/app/core/Block';
import template from './ui/error-server.hbs';
import {ErrorPageContent} from "~/widgets/error-page-content";

export type ErrorServerProps = {
    blockPropsAndChildren: {
        errorPageContent: ErrorPageContent
    }
}

export class ErrorServer extends Block<ErrorServerProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
