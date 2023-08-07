import {Block} from "~/app/core/Block";
// @ts-ignore
import template from "./ui/profile-navigate-button.hbs";
import {BlockEvents} from "~/app/core/types";

export type ProfileNavigateButtonProps = {
    blockEvents: BlockEvents,
    blockPropsAndChildren: {
    }
}

export class ProfileNavigateButton extends Block<ProfileNavigateButtonProps> {
    protected render(): DocumentFragment {
        return  this.compile(template, this.blockProps);
    }
}
