import {Block} from "~/app/core/Block";
// @ts-expect-error
import template from "./alt-nav.hbs";
import {BlockEvents} from "~/app/core/types";

type AltNavProps = {
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        buttonAlternativeNavigationText: string
    }
}
export class AltNav extends Block<AltNavProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
