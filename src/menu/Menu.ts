import { app } from "../App.js";
import { IMenu } from "../Type.js";
import { Akar } from "./Akar.js";
import { EditProperty } from "./EditProperty.js";
import { ItemDipilih } from "./ItemDipilih.js";
import { ObjBaru } from "./ObjBaru.js";

export class Menu {

	readonly akar: Akar = new Akar();
	readonly objBaru: ObjBaru = new ObjBaru();
	readonly itemDipilih: ItemDipilih = new ItemDipilih();
	readonly edit: EditProperty = new EditProperty();

	readonly hal: IMenu[] = [];

	pop(): void {
		this.hal.pop();
		if (this.hal.length > 0) {
			this.ganti(this.hal[this.hal.length - 1]);
		}
	}

	popAll(): void {
		while (this.hal.length > 0) {
			this.hal.pop();
		}
		this.bersihkanCont();
	}

	bersihkanCont(): void {
		while (app.hal.tombolCont.firstChild) {
			app.hal.tombolCont.removeChild(app.hal.tombolCont.firstChild);
		}
	}

	ganti(hal: IMenu): void {
		this.bersihkanCont();
		app.hal.tombolCont.appendChild(hal.view);
		hal.reset();
		this.hal.push(hal);
	}


}