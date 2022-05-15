
namespace ha.bb {
    export class BbData {
        private _p: Playground = new Playground();
        private _kam: Kamera = new Kamera();

        public get kam(): Kamera {
            return this._kam;
        }

        public get p(): Playground {
            return this._p;
        }

        init(): void {
            this.p.init();
            this.dariData();
            this._kam.init();
            this._kam.geser(0, 0);
            this._kam.log();
        }

        defName(): string {
            return '';
        }

        kosong(d: any): boolean {
            return d === undefined;
        }

        dariData(): void {
            data.model.forEach((item: IModel) => {
                if (item.ty == 'kotak') {
                    let b: BABYLON.Mesh = BABYLON.MeshBuilder.CreateBox('', {
                        width: item.panjang !== undefined ? item.panjang : 1,
                        height: item.tinggi !== undefined ? item.tinggi : 1,
                        depth: item.lebar !== undefined ? item.lebar : 1,
                    });

                    if (item.r !== undefined) {
                        b.rotation = (new BABYLON.Vector3(item.r.x * (Math.PI / 180), item.r.y * (Math.PI / 180), item.r.z * (Math.PI / 180)));
                    }
                }
                else {
                    throw Error('model type salah: ' + item.ty)
                }
            })
        }
    }
}


var bbData = new ha.bb.BbData();
window.onload = () => {
    bbData.init();
}