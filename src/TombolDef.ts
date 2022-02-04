import { app } from "./App.js";

//tombol umum
export class TombolDef {
	readonly data: ITombolDef = {}

	init() {
		this.data.buat = app.tombol.buat('buat ...', () => {
			app.menu.ganti(app.menu.objBaru);
		});
	}
}

export interface ITombolDef {
	buat?: HTMLButtonElement;
}