import { app } from "../App.js";
import { dialog } from "../comp/Dialog.js";
import { BaseMenu } from "./BaseMenu.js";
import { Pemisah } from "./view/Input.js";

export class Akar extends BaseMenu {
    constructor() {
        super();

        this.view.appendChild(app.tombol.buat('simpan', () => {
            app.db.simpan();
            dialog.tampil('data telah disimpan');
        }));

        this.view.appendChild(app.tombol.buat('muat', () => {
            console.debug('muat');
        }));

        this.view.appendChild(app.tombol.buat('baru', () => {
            console.debug('baru');
        }));

        let p: Pemisah = new Pemisah();
        p.attach(this.view);

        this.view.appendChild(app.tombol.buat('obj baru ...', () => {
            // console.debug('click');

            //TODO: [dev] menu object baru
            //this.menuTambahAnakKlik();
            app.menu.ganti(app.menu.objBaru);
        }));
    }
}