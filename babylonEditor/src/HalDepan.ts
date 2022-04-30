import { Util } from "./comp/Util.js";

export var halDepan = {
    tombolCont: Util.getEl('tombol-cont', document.body as HTMLElement) as HTMLDivElement,
    struktur: Util.getEl('.cont-utama menu-cont struktur', document.body) as HTMLDivElement
}