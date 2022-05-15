namespace ha.bb {
	export class Playground {
		private _canvas: HTMLCanvasElement;
		private _engine: BABYLON.Engine = null;
		private _scene: BABYLON.Scene = null;
		private _camera: BABYLON.UniversalCamera;

		public get camera(): BABYLON.UniversalCamera { return this._camera; }
		public get canvas(): HTMLCanvasElement { return this._canvas; }
		public get scene(): BABYLON.Scene { return this._scene; }

		init() {

			this._canvas = document.getElementById("canvas") as HTMLCanvasElement;
			this._engine = this.createDefaultEngine(this._canvas);
			this._scene = this.createDefScene(this._engine, this._canvas);

			this._engine.runRenderLoop(() => {
				if (this.scene && this.scene.activeCamera) {
					this.scene.render();
				}
			});

			window.addEventListener("resize", () => {
				this._engine.resize();
			});
		}

		private createDefaultEngine(canvas: HTMLCanvasElement) {
			return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false });
		};

		private createDefScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
			// This creates a basic Babylon Scene object (non-mesh)
			let scene = new BABYLON.Scene(engine);

			// This creates and positions a free camera (non-mesh)
			canvas;
			this._camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

			// let camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
			// camera.setPosition(new BABYLON.Vector3(0, 8, -17));
			// camera.attachControl(canvas, true);

			// BABYLON.mesh

			// This targets the camera to scene origin
			this._camera.setTarget(BABYLON.Vector3.Zero());

			// This attaches the camera to the canvas
			// this._camera.attachControl(canvas, true);

			// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
			let light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 1), scene);

			// Default intensity is 1. Let's dim the light a small amount
			light.intensity = 0.7;

			return scene;
		}

	}

}

