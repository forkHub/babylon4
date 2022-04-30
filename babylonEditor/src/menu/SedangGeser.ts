import { App, app } from "../App.js";
import { BaseMenu } from "./BaseMenu.js"

export class SedangGeser extends BaseMenu {
	constructor() {
		super();

		this.view.appendChild(app.tombol.buat('ok', () => {
			app.menu.ganti(app.menu.itemDipilih.transform);
			app.state = App.ST_CAM;
		}))

	}
}