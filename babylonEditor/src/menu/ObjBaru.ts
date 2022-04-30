import { app } from "../App.js";
import { BaseMenu } from "./BaseMenu.js";

export class ObjBaru extends BaseMenu {

    constructor() {
        super();

        this.view.appendChild(app.tombol.buat('bola', () => {
            app.objH.tambahAnak(app.itemDipilih, app.defData.defBola());
        }));

    }
}