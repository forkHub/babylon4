import { Tombol } from "./comp/Tombol.js";
import { Util } from "./comp/Util.js";
import { Db } from "./Db.js";
import { DefObj3DData } from "./DefObj.js";
import { halDepan } from "./HalDepan.js";
import { Id } from "./Id.js";
import { Menu } from "./menu/Menu.js";
import { Obj3DHandler } from "./Obj3DHandler.js";
import { Playground } from "./PlayGround.js";
import { Pohon } from "./pohon/Pohon.js";
import { Primitif } from "./Primitif.js";
import { ITombolDef, TombolDef } from "./TombolDef.js";
import { IFile, IObj3D, IPointer, } from "./Type.js";

export class App {
	static readonly ST_EDIT: number = 1;
	static readonly ST_CAM: number = 2;

	readonly p: Playground = new Playground();
	readonly objH: Obj3DHandler = new Obj3DHandler();
	readonly defData: DefObj3DData = new DefObj3DData();
	readonly id: Id = new Id();
	readonly prim: Primitif = new Primitif();
	readonly pohon: Pohon = new Pohon();
	readonly hal = halDepan;
	readonly tombol: Tombol = new Tombol();
	readonly db: Db = new Db();

	private _tombolDef: TombolDef = new TombolDef();
	private _menu: Menu;
	private _itemDipilih: IObj3D;
	private _state: number = App.ST_CAM;
	private _pointerDiPencet: boolean = false;

	public get pointerDiPencet(): boolean {
		return this._pointerDiPencet;
	}
	public get state(): number { return this._state; }
	public set state(value: number) { this._state = value; }

	private _pointer: IPointer = {
		pencet: false,
		awal: {
			x: 0,
			y: 0
		},
		akhir: {
			x: 0,
			y: 0
		}
	}

	constructor() {

	}

	init(): void {
		this._tombolDef.init();
		this.p.init();

		this.objH.buatAkar();

		this._menu = new Menu();

		if (!this.reload()) {
			this.testBuatDataAwal();
		}

		this.pointerInit();

	}

	pointerInit(): void {
		this.p.scene.onPointerObservable.add((pointerInfo: BABYLON.PointerInfo) => {
			switch (pointerInfo.type) {
				case BABYLON.PointerEventTypes.POINTERDOWN:
					if (App.ST_EDIT == this._state) {
						console.debug("start move");
						this.p.camera.detachControl();
						this._pointer.pencet = true;
						this._pointer.awal.x = this.p.scene.pointerX;
						this._pointer.awal.y = this.p.scene.pointerY;
						app.objH.simpanPosisiAwal(app.itemDipilih);
					}
					else {
						console.debug("mouse down, state: " + app._state + '/state_edit: ' + App.ST_EDIT);
					}

					break;
				case BABYLON.PointerEventTypes.POINTERUP:
					this.p.camera.attachControl(this.p.canvas);
					this._pointer.pencet = false;
					console.debug("POINTER UP");
					break;
				case BABYLON.PointerEventTypes.POINTERMOVE:
					this._pointer.akhir.x = this.p.scene.pointerX;
					this._pointer.akhir.y = this.p.scene.pointerY;

					if (App.ST_EDIT == this._state) {
						if (this._pointer.pencet) {
							let gapX: number = this._pointer.akhir.x - this._pointer.awal.x;
							let gapY: number = this._pointer.akhir.y - this._pointer.akhir.y;

							gapX = gapX / this.p.canvas.width;
							gapY = gapY / this.p.canvas.height;

							gapX *= 5;
							gapY *= 5;

							gapX = Math.floor(gapX);
							gapY = Math.floor(gapY);

							app.objH.gerakPointer(app.itemDipilih, gapX, 0, 0);
						}
					}

					break;
				case BABYLON.PointerEventTypes.POINTERWHEEL:
					// console.log("POINTER WHEEL");
					break;
				case BABYLON.PointerEventTypes.POINTERPICK:
					// console.log("POINTER PICK");
					break;
				case BABYLON.PointerEventTypes.POINTERTAP:
					// console.log("POINTER TAP");
					break;
				case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
					// console.log("POINTER DOUBLE-TAP");
					break;
			}
		});
	}

	testBuatDataAwal(): void {
		this.objH.reset();
		this.objH.tambahAnak(this.objH.akar, this.defData.defBola());
		this.objH.tambahAnak(this.objH.akar, this.defData.defTanah());
		// this.db.simpan();
	}

	reload(): boolean {
		console.group('reload');
		try {
			let data: string = this.db.load();

			console.debug('data');
			console.debug(data);

			if (!data) return false;

			let dataObj: IFile = JSON.parse(data) as IFile;

			console.debug('data obj');
			console.debug(dataObj);

			this.objH.buatObjDariData(dataObj.data);

			this.id.id = dataObj.id;
		}
		catch (e) {
			Util.error(e);
			console.groupEnd();
			return false;
		}

		console.groupEnd();
		return true;
	}

	public get menu(): Menu {
		return this._menu;
	}

	public get itemDipilih(): IObj3D {
		return this._itemDipilih;
	}
	public set itemDipilih(value: IObj3D) {
		this._itemDipilih = value;
	}

	public get tombolDef(): ITombolDef {
		return this._tombolDef.data;
	}


}

export var app: App = new App();

window.onload = () => {
	app.init();
}