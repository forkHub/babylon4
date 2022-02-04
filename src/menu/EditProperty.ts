import { app } from "../App.js";
import { Input } from "./view/Input.js";
import { BaseMenu } from "./BaseMenu.js";

export class EditProperty extends BaseMenu {
	private posisiX: Input;
	private posisiY: Input;
	private posisiZ: Input;

	private skalaX: Input;
	private skalaY: Input;
	private skalaZ: Input;

	constructor() {
		super();

		this.posisiX = new Input('x:', 0, () => {
			app.itemDipilih.data3D.posisi.x = parseInt(this.posisiX.input.value);
			app.objH.transform23D(app.itemDipilih);
		});
		this.posisiX.attach(this.view);

		this.posisiY = new Input('y:', 0, () => {
			app.itemDipilih.data3D.posisi.y = parseInt(this.posisiY.input.value);
			app.objH.transform23D(app.itemDipilih);
		});
		this.posisiY.attach(this.view);

		this.posisiZ = new Input('z:', 0, () => {
			app.itemDipilih.data3D.posisi.z = parseInt(this.posisiZ.input.value);
			app.objH.transform23D(app.itemDipilih);
		});
		this.posisiZ.attach(this.view);

		this.pemisah(this.view);
		this.label('skala:', this.view);

		this.skalaX = new Input('x:', 0, () => {
			app.itemDipilih.data3D.skala.x = parseInt(this.skalaX.input.value);
			app.objH.transform23D(app.itemDipilih);
		});
		this.skalaX.attach(this.view);

		this.skalaY = new Input('y:', 0, () => {
			app.itemDipilih.data3D.skala.y = parseInt(this.skalaY.input.value);
			app.objH.transform23D(app.itemDipilih);
		});
		this.skalaY.attach(this.view);

		this.skalaZ = new Input('z:', 0, () => {
			app.itemDipilih.data3D.skala.z = parseInt(this.skalaZ.input.value);
			app.objH.transform23D(app.itemDipilih);
		});
		this.skalaZ.attach(this.view);


	}

	reset(): void {
		this.posisiX.input.value = app.itemDipilih.data3D.posisi.x + '';
		this.posisiY.input.value = app.itemDipilih.data3D.posisi.y + '';
		this.posisiZ.input.value = app.itemDipilih.data3D.posisi.z + '';

		this.skalaX.input.value = app.itemDipilih.data3D.skala.x + '';
		this.skalaY.input.value = app.itemDipilih.data3D.skala.y + '';
		this.skalaZ.input.value = app.itemDipilih.data3D.skala.z + '';
	}

}