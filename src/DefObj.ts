import { Obj3DHandler } from "./Obj3DHandler.js";
import { IObj3DData, IKosong, IBolaData, ITanahData } from "./Type.js";

export class DefObj3DData {
	private defObj3D(): IObj3DData {
		return {
			posisi: new BABYLON.Vector3(0, 0, 0),
			skala: new BABYLON.Vector3(1, 1, 1),
			posisiAwal: new BABYLON.Vector3(0, 0, 0)
		}
	}

	defKosong(): IKosong {
		let kosong: IKosong = this.defObj3D();
		kosong.type = Obj3DHandler.KOSONG;
		kosong.nama = 'pivot';
		return kosong
	}

	defBola(): IBolaData {
		let obj: IBolaData = this.defObj3D();

		obj.type = Obj3DHandler.BOLA;
		obj.diameter = 2
		obj.segmen = 16;
		obj.nama = 'bola';

		return obj;
	}

	defTanah(): ITanahData {
		let obj: ITanahData = this.defObj3D();

		obj.sub = 2;
		obj.pjg = 6;
		obj.lbr = 6;
		obj.type = Obj3DHandler.TANAH;
		obj.nama = 'tanah';

		return obj;
	}
}