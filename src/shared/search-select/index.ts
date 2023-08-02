import {Block} from "~/app/core/Block";
//@ts-ignore
import template from "./ui/search-select.hbs";
import {BlockEvents} from "~/app/core/types";
import {MenuItem} from "~/entities/menu-item";
import {Input} from "~/shared/input";
import {submitHandler} from "~/app/core/SubmitHandler";

type SearchSelectProps = {
    blockEvents?: BlockEvents
    blockPropsAndChildren: {
        inputField: Input,
        menuItems: MenuItem[],
    }
}

export class SearchSelect extends Block<SearchSelectProps> {

    protected init() {
        super.init();

        submitHandler.subscribe('SearchSelect', this.componentForceUpdate, this);
    }
    protected render(): DocumentFragment {
        return this.compile(template, this.blockProps);
    }
}
