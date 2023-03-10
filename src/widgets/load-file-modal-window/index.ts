import {Block} from '~/app/core/Block';
// @ts-ignore
import template from './ui/load-file-modal-window.hbs';
import {Card} from "~/shared/card";

export type LoadFileModalWindowProps = {
    blockPropsAndChildren: {
        card: Card;
    }
}
export class LoadFileModalWindow extends Block<LoadFileModalWindowProps> {
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
