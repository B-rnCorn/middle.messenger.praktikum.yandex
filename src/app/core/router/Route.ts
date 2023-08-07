import {BlockProps} from "~/app/core/types";
import {createPageInstance, Routes} from "~/app/core/router/Routes";

export class Route<Props extends BlockProps> {

    constructor(
        private _pathname: Routes,
        //@ts-expect-error возможно понадобится, пока не юзается
        private _props: Props,
        private _block: ReturnType<typeof createPageInstance>| null = null,
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
            this._block = createPageInstance(this._pathname);
            const app = document.querySelector("#app") as HTMLElement;
            if (app && !!this._block?.getContent()) {
                app.innerHTML = "";
                //@ts-expect-error
                app.appendChild(this._block.getContent());
                this._block.dispatchComponentDidMount();
            }
            return;
        }

        this._block.show();
    }
}
