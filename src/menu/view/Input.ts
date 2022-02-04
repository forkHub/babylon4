import { BaseComponent } from "../../comp/BaseComponent.js";

export class Input extends BaseComponent {
    constructor(label: string, value: number, f: Function) {
        super();
        this._template = `
            <div>
                <label>${label}</label><br/>
                <input type="number" value="${value}">
            </div>
        `;
        this.build();

        this.input.oninput = (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            f();
        }
    }

    get input(): HTMLInputElement {
        return this.getEl('input') as HTMLInputElement;
    }
}

export class Label extends BaseComponent {
    constructor(label: string) {
        super();
        this._template = `
            <div>
                <label>${label}</label>
            </div>
        `;
        this.build();
    }

    get label(): HTMLInputElement {
        return this.getEl('label') as HTMLInputElement;
    }
}


export class Pemisah extends BaseComponent {
    constructor() {
        super();
        this._template = `
            <div>
                <hr/>
            </div>
        `;
        this.build();
    }

    get hr(): HTMLInputElement {
        return this.getEl('hr') as HTMLInputElement;
    }
}