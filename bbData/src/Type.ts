interface IModel {
	ty?: string,
	base?: IModel,
	p?: IV3D
	s?: IV3D,
	r?: IV3D,

	//ukuran
	panjang?: number, //panjang
	lebar?: number, //lebar
	tinggi?: number, //tinggi
}

interface IV3D {
	x: number,
	y: number,
	z: number
}

interface IScene {
	model?: IModel[],
}