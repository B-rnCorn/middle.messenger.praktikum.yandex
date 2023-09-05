import {Block} from '~/app/core/Block';
import template from './ui/error-not-found.hbs';
import {ErrorPageContent} from "~/widgets/error-page-content";

export type ErrorNotFoundProps = {
    blockPropsAndChildren: {
        errorPageContent: ErrorPageContent
    }
}

export class ErrorNotFound extends Block<ErrorNotFoundProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
