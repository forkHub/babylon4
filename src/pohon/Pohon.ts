import { App, app } from "../App.js";
import { IObj3D } from "../Type.js";
import { PohonItem } from "./PohonItem.js";

export class Pohon {

	buatItem(item: IObj3D, cont: HTMLDivElement): PohonItem {
		console.debug('buat item');
		console.debug(item);

		let view: PohonItem = new PohonItem();
		view.elHtml.setAttribute('id', item.id + '');
		view.nama.innerHTML = item.data3D.nama;
		view.obj3D = item;

		view.toggleTbl.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();

			this.toggleKlik(view);
		}

		view.nama.onclick = (e: MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			this.namaKlik(view);
		}

		view.attach(cont);
		console.debug('buat item');
		return view;
	}

	private namaKlik(view: PohonItem): void {
		// console.debug('nama click');
		// console.debug(document.body.querySelectorAll('pohon-item div.nama-cont'));
		document.body.querySelectorAll('pohon-item div.nama-cont').forEach((item: Element) => {
			// console.debug(item);
			item.classList.remove('dipilih');
		});

		view.namaCont.classList.add('dipilih');
		// console.debug(view.namaCont);

		if (app.itemDipilih && app.itemDipilih.view3D.material) {
			app.itemDipilih.view3D.material.wireframe = false;
		}

		app.itemDipilih = view.obj3D;
		app.itemDipilih.view3D.material.wireframe = true;
		app.state = App.ST_CAM;

		//buat tombol
		app.hal.tombolCont.innerHTML = '';

		if (app.itemDipilih.akar) {
			app.menu.ganti(app.menu.akar);

			// app.hal.tombolCont.appendChild(app.tombol.buat('simpan', () => {
			//     app.db.simpan();
			//     dialog.tampil('data telah disimpan');
			// }));
		}
		else {
			app.menu.ganti(app.menu.itemDipilih);
		}

		//bareng-bareng
		// app.hal.tombolCont.appendChild(app.tombol.buat('tambah anak ...', () => {
		//     console.debug('click');
		//     this.menuTambahAnakKlik();
		// }));
	}

	private toggleKlik(view: PohonItem): void {
		view.cont.classList.toggle('disp-block');
		view.cont.classList.toggle('disp-none');
	}

	/*
	private menuEdit(): void {
		app.hal.tombolCont.innerHTML = '';

		let input: Input = new Input('x', app.itemDipilih.data3D.posisi.x, () => {
			// console.debug(input.input.value);
			app.itemDipilih.data3D.posisi.x = parseInt(input.input.value);
			app.itemDipilih.view3D.position.x = app.itemDipilih.data3D.posisi.x;
		});

		input.attach(app.hal.tombolCont);
	}
	*/

	/*
	private menuTambahAnakKlik(): void {
		app.hal.tombolCont.innerHTML = '';
		app.hal.tombolCont.appendChild(app.tombol.buat('bola', () => {
			app.objH.tambahAnak(app.itemDipilih, app.defData.defBola());
		}));
	}
	*/
}