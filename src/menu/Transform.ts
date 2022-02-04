import { App, app } from "../App.js";
import { BaseMenu } from "./BaseMenu.js";
import { SedangGeser } from "./SedangGeser.js";

export class Transform extends BaseMenu {
	readonly sedangGeser: SedangGeser = new SedangGeser();

	constructor() {
		super();

		this.view.appendChild(app.tombol.buat('pindah', () => {
			app.state = App.ST_EDIT;
			app.menu.ganti(this.sedangGeser);
		}))

		this.view.appendChild(app.tombol.buat('skala', () => {
		}))

		this.view.appendChild(app.tombol.buat('rotasi', () => {
		}))

	}
}