import { app } from "./App.js";
import { IFile } from "./Type.js";

export class Db {
    simpan(): void {
        let obj: IFile = {
            data: app.objH.simpan(),
            id: app.id.toDbo()
        }

        window.localStorage.setItem('ha.b4.simpan', JSON.stringify(obj));
    }

    load(): string {
        return window.localStorage.getItem('ha.b4.simpan');
    }
}