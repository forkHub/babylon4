import { app } from "../App.js";
import { BaseMenu } from "./BaseMenu.js";
import { Transform } from "./Transform.js";

export class ItemDipilih extends BaseMenu {
	readonly transform: Transform = new Transform();

	constructor() {
		super();

		this.view.appendChild(app.tombolDef.buat);

		this.view.appendChild(app.tombol.buat('hapus ...', () => {
			let ok: boolean = window.confirm('hapus?');
			if (ok) {
				app.objH.hapus(app.itemDipilih);
			}
		}));

		this.view.appendChild(app.tombol.buat('edit ...', () => {
			console.debug('edit');
			app.menu.ganti(app.menu.edit)
		}))

		this.view.appendChild(app.tombol.buat('transform', () => {
			app.menu.ganti(this.transform);
		}))


	}

}