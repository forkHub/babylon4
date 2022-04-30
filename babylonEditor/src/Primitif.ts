import { app } from "./App.js";
import { Obj3DHandler } from "./Obj3DHandler.js";
import { IObj3D, IBolaData, ITanahData, IObj3DData } from "./Type.js";

export class Primitif {

    buatPrime(obj: IObj3D, scene: BABYLON.Scene): BABYLON.Mesh {
        console.debug('prim by type, type: ' + obj.data3D.type);
        console.debug('prim by type, nama: ' + obj.data3D.nama);

        let mesh: BABYLON.Mesh;

        if (obj.data3D.type == Obj3DHandler.BOLA) {
            mesh = this.bola(obj.data3D as IBolaData, scene, obj.data3D.nama);
        }
        else if (obj.data3D.type == Obj3DHandler.TANAH) {
            mesh = this.tanah(obj.data3D as ITanahData, scene, obj.data3D.nama);
        }
        else if (obj.data3D.type == Obj3DHandler.KOSONG) {
            mesh = new BABYLON.Mesh(obj.data3D.nama, scene);
        }
        else {
            console.error('type salah, ' + obj.data3D.type);
            return null;
        }

        if (mesh) {
            let mat: BABYLON.StandardMaterial = new BABYLON.StandardMaterial('mat' + obj.id, app.p.scene);
            // mat.backFaceCulling = true;
            mesh.material = mat;
            obj.mat3D = mat;
        }


        return mesh;

    }

    private bola(bolaObj: IBolaData, scene: BABYLON.Scene, nama: string): BABYLON.Mesh {
        console.debug('bola: ' + nama);

        let bola: BABYLON.Mesh = BABYLON.Mesh.CreateSphere(
            nama,
            bolaObj.segmen,
            bolaObj.diameter,
            scene);

        //posisi
        bola.position.y = bolaObj.posisi.y;
        bola.position.x = bolaObj.posisi.x;
        bola.position.z = bolaObj.posisi.z;

        //skala
        bola.scaling.x = bolaObj.skala.x;
        bola.scaling.y = bolaObj.skala.y;
        bola.scaling.z = bolaObj.skala.z;

        return bola;
    }

    private tanah(obj: ITanahData, scene: BABYLON.Scene, nama: string): BABYLON.Mesh {
        let tanah: BABYLON.Mesh = BABYLON.Mesh.CreateGround(nama, obj.pjg, obj.lbr, obj.sub, scene);
        this.transform(tanah, obj);
        return tanah;
    }

    private transform(mesh: BABYLON.Mesh, data: IObj3DData): void {
        console.debug('transform');
        //posisi
        mesh.position.y = data.posisi.y;
        mesh.position.x = data.posisi.x;
        mesh.position.z = data.posisi.z;

        //skala
        mesh.scaling.x = data.skala.x;
        mesh.scaling.y = data.skala.y;
        mesh.scaling.z = data.skala.z;
    }
}
