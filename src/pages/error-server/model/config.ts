import {ErrorPageContent} from "~/widgets/error-page-content";
import {ErrorServerProps} from "~/pages/error-server";

export const errorServerConfig: ErrorServerProps = {
    blockPropsAndChildren: {
        errorPageContent: new ErrorPageContent({
            blockPropsAndChildren: {
                errorCode: '500',
                errorMessage: 'Мы уже фиксим'
            }
        })
    }
}
