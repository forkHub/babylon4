
namespace ha.bb {
    export class Kamera {
        static readonly PUTAR: number = 1;
        static readonly JALAN: number = 2;

        private pencetX: number = 0;
        private pencetY: number = 0;
        private mousePencet: boolean = false;
        private gerakX: number = 0;
        private gerakY: number = 0;
        private rotasiAktifX: number = 0;
        private rotasiAktifY: number = 0;
        private pelan: number = .005;

        private _kotakKam: BABYLON.Mesh;
        private _kotakKamV: BABYLON.Mesh;
        private _kotakKam2: BABYLON.Mesh;

        // private kotak2: BABYLON.Mesh;

        // private _mode: number = Kamera.JALAN; //TODO:


        log(): void {
            let debug: HTMLDivElement = document.querySelector('ha-debug');
            debug.innerHTML = `
                pence: ${this.mousePencet} <br/>
                awalX: ${this.pencetX} <br/>
                awalY: ${this.pencetY} <br/>
                gerakX: ${this.gerakX} <br/>
                gerakY: ${this.gerakY} <br/>
                kotakVRotation x : ${this._kotakKamV.rotation.x}<br/>
                camera rotation x : ${bbData.p.camera.rotation.x}<br/>
                camera rotation y : ${bbData.p.camera.rotation.y}<br/>
            `;

            //cone
            let str: string = `
                cone local x rot: ${this._kotakKam2.rotation.x} <br/>
                cone local y rot: ${this._kotakKam2.rotation.y} <br/>
                cone local z rot: ${this._kotakKam2.rotation.z} <br/>
            `;
            debug.innerHTML += str;

            let m: BABYLON.Matrix = this._kotakKam2.getWorldMatrix();
            let p: BABYLON.Vector3 = new BABYLON.Vector3();
            let r: BABYLON.Quaternion = new BABYLON.Quaternion();
            let s: BABYLON.Vector3 = new BABYLON.Vector3();
            let ru: BABYLON.Vector3 = new BABYLON.Vector3();

            m.decompose(s, r, p);
            ru = r.toEulerAngles();

            let str2: string = `
                cone world x rot: ${ru.x} <br/>
                cone world y rot: ${ru.y} <br/>
                cone world z rot: ${ru.z} <br/>
                cone world x pos: ${p.x} <br/>
                cone world y pos: ${p.y} <br/>
                cone world z pos: ${p.z} <br/>
            `;
            debug.innerHTML += str2;


        }

        debugCone(): void {

        }

        geser(gapX: number, gapY: number): void {
            this._kotakKam.rotation.y = this.rotasiAktifY + (gapX * this.pelan);
            this._kotakKamV.rotation.x = this.rotasiAktifX + (gapY * this.pelan * -1);
            // this.kotak2.lookAt(this._kotakKam2.getAbsolutePosition());

            let p: BABYLON.Vector3 = this._kotakKam2.getAbsolutePosition();

            bbData.p.camera.position.x = p.x;
            bbData.p.camera.position.y = p.y;
            bbData.p.camera.position.z = p.z;
            bbData.p.camera.setTarget(this._kotakKamV.getAbsolutePosition());

            // bbData.p.camera.rotationQuaternion = this.kotak2.rotationQuaternion;

            /*

            bbData.p.camera.position.x = 0;
            bbData.p.camera.position.y = 0;
            bbData.p.camera.position.z = 0;

            bbData.p.camera.rotation.x = 0;
            bbData.p.camera.rotation.y = this.kotakKam.rotation.y;
            // bbData.p.camera.rotation.z = this.kotakKam.rotation.z;

            bbData.p.camera.position.z -= 10;
            // bbData.p.camera.posi
            */
        }

        init(): void {
            console.log('kam init');

            this._kotakKam = new BABYLON.Mesh("DUMMY", bbData.p.scene);
            this._kotakKamV = new BABYLON.Mesh("DUMMYV", bbData.p.scene);
            this._kotakKam2 = new BABYLON.Mesh("DUMMYV", bbData.p.scene);

            // this._kotakKam = BABYLON.MeshBuilder.CreateBox("", {});
            // this._kotakKamV = BABYLON.MeshBuilder.CreateBox("", {});
            // this._kotakKam2 = BABYLON.MeshBuilder.CreateBox("", {});

            this._kotakKamV.setParent(this._kotakKam);
            this._kotakKam2.setParent(this._kotakKamV);

            this._kotakKam2.translate(new BABYLON.Vector3(0, 0, 1), 15);
            // this._kotakKam2.rotation.x = 90;
            // this._kotakKam2.lookAt(this._kotakKamV.position);
            // this._kotakKam2.lookAt(this._kotakKamV.getAbsolutePosition());

            // this.kotak2 = BABYLON.MeshBuilder.CreateCylinder("", {});
            // this.kotak2.position.z = 5;
            // this.kotak2.lookAt(this._kotakKam2.getAbsolutePosition());

            bbData.p.camera.lockedTarget = this._kotakKamV

            bbData.p.scene.onPointerObservable.add((pointerInfo: BABYLON.PointerInfo) => {
                switch (pointerInfo.type) {
                    case BABYLON.PointerEventTypes.POINTERDOWN:
                        console.log('pointer down');
                        this.pencetX = bbData.p.scene.pointerX;
                        this.pencetY = bbData.p.scene.pointerY;
                        this.mousePencet = true;
                        this.rotasiAktifY = this._kotakKam.rotation.y;
                        this.rotasiAktifX = this._kotakKamV.rotation.x;
                        this.log();

                        break;
                    case BABYLON.PointerEventTypes.POINTERUP:
                        if (this.mousePencet) {
                            this.mousePencet = false;
                            console.log('pointer up');
                            this.log();
                        }

                        break;
                    case BABYLON.PointerEventTypes.POINTERMOVE:
                        if (this.mousePencet) {
                            this.gerakX = bbData.p.scene.pointerX - this.pencetX;;
                            this.gerakY = bbData.p.scene.pointerY - this.pencetY;
                            this.geser(this.gerakX, this.gerakY);
                            this.log();
                        }

                        break;
                    case BABYLON.PointerEventTypes.POINTERWHEEL:
                        break;
                    case BABYLON.PointerEventTypes.POINTERPICK:
                        console.group('pointer pick');
                        console.log(pointerInfo.pickInfo);
                        console.log(pointerInfo.event);
                        console.groupEnd();

                        break;
                    case BABYLON.PointerEventTypes.POINTERTAP:
                        break;
                    case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                        break;
                }
            });

        }

    }
}