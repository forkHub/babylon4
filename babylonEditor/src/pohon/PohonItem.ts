import { BaseComponent } from "../comp/BaseComponent.js";
import { IObj3D } from "../Type.js";

export class PohonItem extends BaseComponent {
    private _obj3D: IObj3D;

    constructor() {
        super();
        this._elHtml = document.body.querySelector('template').content.querySelector('pohon-item').cloneNode(true) as HTMLElement;
    }

    public get obj3D(): IObj3D {
        return this._obj3D;
    }
    public set obj3D(value: IObj3D) {
        this._obj3D = value;
    }

    get nama(): HTMLDivElement {
        return this.getEl('nama') as HTMLDivElement;
    }

    get cont(): HTMLDivElement {
        return this.getEl('cont') as HTMLDivElement;
    }

    get menuTbl(): HTMLButtonElement {
        return this.getEl('div.nama-cont button.menu') as HTMLButtonElement;
    }

    get toggleTbl(): HTMLButtonElement {
        return this.getEl('div.nama-cont button.toggle') as HTMLButtonElement;
    }

    get namaCont(): HTMLDivElement {
        return this.getEl('div.nama-cont') as HTMLDivElement;
    }

}