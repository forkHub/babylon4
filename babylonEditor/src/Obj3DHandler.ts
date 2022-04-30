// import { TorusKnotBuilder } from "babylonjs/Meshes/Builders/torusKnotBuilder";
import { app } from "./App.js";
import { IBolaData, IObj3D, IObj3DData, ITanahData } from "./Type.js";

export class Obj3DHandler {
	static readonly BOLA: string = "bola";
	static readonly TANAH: string = "tanah";
	static readonly KOSONG: string = 'kosong';

	private list: IObj3D[] = [];
	private _mat: BABYLON.StandardMaterial;
	public get mat(): BABYLON.StandardMaterial {
		return this._mat;
	}

	private _akar: IObj3D;
	public get akar(): IObj3D {
		return this._akar;
	}

	hapus(itemDipilih: IObj3D) {
		console.debug('hapus object');

		//set parent buat anak to akar
		this.cariAnak(itemDipilih.id).forEach((item: IObj3D) => {
			item.view3D.setParent(this._akar.view3D);
			item.view.attach(this._akar.view.cont);
			item.induk = this._akar.id;
			this.transformDari3D(item);
		});

		if (itemDipilih.view3D.material) {
			itemDipilih.view3D.material.dispose();
		}

		itemDipilih.view3D.dispose();
		itemDipilih.view.detach();

		//hapus dari list
		for (let i: number = 0; i < this.list.length; i++) {
			if (this.list[i].id == itemDipilih.id) {
				this.list.splice(i, 1);
			}
		}

		//hapus struktur
		// let induk: IObj3D = this.cariInduk(this._akar, itemDipilih);
		// this.hapusAnakDariList(induk, itemDipilih);

		console.log(itemDipilih);
	}

	reset(): void {
		console.group('reset');
		while (this.list.length > 0) {
			let item: IObj3D = this.list.pop();
			if (!item.akar) {
				item.view3D.dispose();
				item.view.detach();
				console.debug('hapus ');
				console.debug(item);
			}
		}
		console.groupEnd();
	}

	private cariAnak(indukId: number): IObj3D[] {
		let hasil: IObj3D[] = [];

		for (let i: number = 0; i < this.list.length; i++) {
			let item: IObj3D = this.list[i];
			if (item.induk == indukId) hasil.push(item);
		}

		return hasil;
	}

	simpan(): IObj3D[] {

		let hasil: IObj3D[] = [];

		console.debug('simpan');

		this.list.forEach((item: IObj3D) => {
			if (!item.akar) {
				hasil.push(this.item2Obj(item));
			}
		});

		console.debug(hasil);

		return hasil;
	}

	buatObjDariData(data: IObj3D[]): void {
		console.group('load');
		console.debug(data);
		this.reset();

		data.forEach((item: IObj3D) => {
			console.group('buat object 3d');
			console.debug(item);
			let obj: IObj3D = this.buatDefObj3D(item.data3D);
			obj.id = item.id;
			obj.akar = false;
			obj.induk = item.induk;
			this.list.push(obj);
			console.groupEnd();
		});

		//buat view
		this.buatView3DRec(this._akar);

		//buat struktur
		this.buatStrukturRek(this._akar);
		console.groupEnd();
	}

	transform23D(obj: IObj3D): void {
		obj.view3D.position.x = obj.data3D.posisi.x;
		obj.view3D.position.y = obj.data3D.posisi.y;
		obj.view3D.position.z = obj.data3D.posisi.z;

		obj.view3D.scaling.x = obj.data3D.skala.x;
		obj.view3D.scaling.y = obj.data3D.skala.y;
		obj.view3D.scaling.z = obj.data3D.skala.z;
	}

	transformDari3D(obj: IObj3D): void {
		obj.data3D.posisi.x = obj.view3D.position.x;
		obj.data3D.posisi.y = obj.view3D.position.y;
		obj.data3D.posisi.z = obj.view3D.position.z;

		obj.data3D.skala.x = obj.view3D.scaling.x;
		obj.data3D.skala.y = obj.view3D.scaling.y;
		obj.data3D.skala.z = obj.view3D.scaling.z;
	}

	private buatStrukturRek(induk: IObj3D): void {
		let list: IObj3D[] = this.cariAnak(induk.id);
		list.forEach((obj: IObj3D) => {
			obj.view = app.pohon.buatItem(obj, induk.view.cont);
			this.buatStrukturRek(obj);
		});
	}

	private buatView3DRec(induk: IObj3D): void {
		let list: IObj3D[] = this.cariAnak(induk.id);

		console.group('buat view 3d rect');
		console.debug(list);

		list.forEach((obj: IObj3D) => {
			console.group('buat item 3d');
			console.debug(obj);

			obj.view3D = app.prim.buatPrime(obj, app.p.scene);
			obj.view3D.setParent(induk.view3D);
			this.transform23D(obj);

			this.buatView3DRec(obj);

			console.groupEnd();
		});

		console.groupEnd();
	}

	private data3D2Obj(data: IObj3DData): any {
		let hasil: any = {
			nama: data.nama,
			type: data.type,

			posisi: {
				x: data.posisi.x,
				y: data.posisi.y,
				z: data.posisi.z
			},
			skala: {
				x: data.skala.x,
				y: data.skala.y,
				z: data.skala.z
			}
		};

		if (data.type == Obj3DHandler.BOLA) {
			let bola: IBolaData = data as IBolaData;
			hasil.diameter = bola.diameter
			hasil.segemen = bola.segmen
		}
		else if (data.type == Obj3DHandler.TANAH) {
			let tanah: ITanahData = data as ITanahData;
			hasil.lbr = tanah.lbr;
			hasil.pjg = tanah.pjg;
			hasil.sub = tanah.sub;
		}
		else if (data.type == Obj3DHandler.KOSONG) {

		}
		else {
			throw Error('type salah');
		}

		return hasil;
	}

	private item2Obj(item: IObj3D): any {
		let obj: IObj3D = {
			id: item.id,
			// nama: item.nama,
			induk: item.induk,
			data3D: this.data3D2Obj(item.data3D),
		}

		return obj;
	}

	simpanPosisiAwal(obj: IObj3D): void {
		obj.data3D.posisiAwal.x = obj.data3D.posisi.x;
		obj.data3D.posisiAwal.y = obj.data3D.posisi.y;
		obj.data3D.posisiAwal.z = obj.data3D.posisi.z;
	}

	gerakPointer(obj: IObj3D, x: number, y: number, z: number): void {
		obj.data3D.posisi.x = obj.data3D.posisiAwal.x + x;
		obj.data3D.posisi.y = obj.data3D.posisiAwal.y + y;
		obj.data3D.posisi.z = obj.data3D.posisiAwal.z + z;
		this.transform23D(obj);
	}

	buatAkar(): void {
		let obj: IObj3D = this.buatDefObj3D(app.defData.defKosong());
		obj.view3D = app.prim.buatPrime(obj, app.p.scene);
		obj.view = app.pohon.buatItem(obj, app.hal.struktur);
		obj.akar = true;
		this._akar = obj;
		this.list.push(this._akar);
		// this.akar.anggota = [];
	}

	private buatDefObj3D(data: IObj3DData): IObj3D {
		let hasil: IObj3D = this.def();
		hasil.data3D = data;

		return hasil;
	}

	private def(): IObj3D {
		let hasil: IObj3D = {
			id: app.id.id,
			// anggota: []
		}
		// hasil.nama = 'def' + hasil.id

		return hasil;
	}

	tambahAnak(induk: IObj3D, data: IObj3DData): IObj3D {
		console.debug('tambah anak');
		console.debug(data);

		let obj3D: IObj3D = this.buatDefObj3D(data);
		obj3D.akar = false;
		obj3D.induk = induk.id;
		// obj3D.nama = obj3D.data3D.nama;

		//render 3d
		obj3D.view3D = app.prim.buatPrime(obj3D, app.p.scene);
		obj3D.view3D.setParent(induk.view3D);

		obj3D.view3D.position.x = data.posisi.x;
		obj3D.view3D.position.y = data.posisi.y;
		obj3D.view3D.position.z = data.posisi.z;

		obj3D.view3D.scaling.x = data.skala.x;
		obj3D.view3D.scaling.y = data.skala.y;
		obj3D.view3D.scaling.z = data.skala.z;

		//render struktur
		obj3D.view = app.pohon.buatItem(obj3D, induk.view.cont);

		induk.view.cont.classList.remove('disp-none');
		induk.view.cont.classList.add('disp-block');

		this.list.push(obj3D);

		return obj3D;
	}

	showWorldAxis(size: number): void {

		var makeTextPlane = function (text: string, color: any, size: number) {
			var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, app.p.scene, true);
			dynamicTexture.hasAlpha = true;
			dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color, "transparent", true);
			var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, app.p.scene, true);
			plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", app.p.scene);
			plane.material.backFaceCulling = false;
			(plane.material as BABYLON.StandardMaterial).specularColor = new BABYLON.Color3(0, 0, 0);
			(plane.material as BABYLON.StandardMaterial).diffuseTexture = dynamicTexture;
			return plane;
		};

		var axisX = BABYLON.Mesh.CreateLines("axisX", [
			BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
			new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
		], app.p.scene);

		axisX.color = new BABYLON.Color3(1, 0, 0);

		var xChar = makeTextPlane("X", "red", size / 10);
		xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);

		var axisY = BABYLON.Mesh.CreateLines("axisY", [
			BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
			new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3(0.05 * size, size * 0.95, 0)
		], app.p.scene);
		axisY.color = new BABYLON.Color3(0, 1, 0);

		var yChar = makeTextPlane("Y", "green", size / 10);
		yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);

		var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
			BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
			new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3(0, 0.05 * size, size * 0.95)
		], app.p.scene);
		axisZ.color = new BABYLON.Color3(0, 0, 1);

		var zChar = makeTextPlane("Z", "blue", size / 10);
		zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

	};
}