import {ErrorPageContent} from "~/widgets/error-page-content";
import {Props} from "~/app/core/types";

export const errorNotFoundConfig: Props = {
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
