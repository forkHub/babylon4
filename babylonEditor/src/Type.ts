import { PohonItem } from "./pohon/PohonItem.js";

export interface IObj3DData {
	posisi?: BABYLON.Vector3;
	skala?: BABYLON.Vector3;
	nama?: string;
	type?: string;

	//tidak disimpan
	posisiAwal?: BABYLON.Vector3;
}

export interface IBolaData extends IObj3DData {
	segmen?: number;
	diameter?: number
}

//static CreateGround(name: string, width: number, height: number, subdivisions: number, scene?: Scene, updatable?: boolean): Mesh;
export interface ITanahData extends IObj3DData {
	pjg?: number,
	lbr?: number,
	sub?: number,
}

export interface IKosong extends IObj3DData {

}

export interface ILuas {
	w: number,
	h: number
}

export interface IObj3D {
	id?: number;
	akar?: boolean;
	induk?: number;

	view?: PohonItem;
	data3D?: IObj3DData;
	view3D?: BABYLON.Mesh;
	mat3D?: BABYLON.Material
}

export interface IPointer {
	pencet: boolean;
	awal: {
		x: number,
		y: number
	},
	akhir: {
		x: number,
		y: number
	}
}



export interface ITombol {
	label: string,
	f: Function
}

export interface IMenu {
	view: HTMLDivElement;
	reset: Function;
}

export interface IFile {
	data: IObj3D[];
	id: number;
}

export interface IDir {

}