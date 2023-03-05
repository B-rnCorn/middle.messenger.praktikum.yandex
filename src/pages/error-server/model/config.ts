import {ErrorPageContent} from "~/widgets/error-page-content";

export const errorServerConfig = {
    blockPropsAndChildren: {
        errorPageContent: new ErrorPageContent({
            blockPropsAndChildren: {
                errorCode: '500',
                errorMessage: 'Мы уже фиксим'
            }
        })
    }
}
