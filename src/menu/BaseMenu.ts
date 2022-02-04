import { IMenu } from "../Type.js";
import { Label, Pemisah } from "./view/Input.js";

export class BaseMenu implements IMenu {
    readonly view: HTMLDivElement;

    constructor() {
        this.view = document.body.querySelector('template').content.querySelector('menu').cloneNode(true) as HTMLDivElement;
    }

    reset(): void {

    }

    label(str: string, view: HTMLElement): void {
        let label: Label = new Label(str);
        label.attach(view);
    }

    pemisah(view: HTMLDivElement): void {
        let p: Pemisah = new Pemisah();
        p.attach(view);
    }
}