import {BlockProps} from "~/app/core/types";
import { Routes } from "~/app/core/router/Routes";
import { Block } from "../Block";

export class Route<Props extends BlockProps> {

    constructor(
        private _pathname: Routes,
        private _props: Props,
        private _blockClass: typeof Block<BlockProps>,
        private _block: Block<BlockProps> | null = null,
    ) {
    }

    navigate(pathname: Routes): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        this._block = null;
    }

    match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    render(): void {
        if (!this._block) {
            //@ts-expect-error
            this._block = new this._blockClass(this._props);
            const app = document.querySelector("#app") as HTMLElement;
            app.innerHTML = "";
            //@ts-expect-error
            app.appendChild(this._block.getContent());
            //@ts-expect-error
            this._block.dispatchComponentDidMount();
            return;
        }

        this._block.show();
    }
}
