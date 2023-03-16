import {ErrorPageContent} from "~/widgets/error-page-content";
import {ErrorNotFoundProps} from "~/pages/error-not-found";

export const errorNotFoundConfig: ErrorNotFoundProps = {
    blockPropsAndChildren: {
        errorPageContent: new ErrorPageContent({
                blockPropsAndChildren: {
                    errorCode: '404',
                    errorMessage: 'Не туда попали :('
                }
            }
        ),
    }
}
