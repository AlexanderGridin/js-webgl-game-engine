import { WebGLRenderer } from "./core";
import { Camera, CameraConfig } from "./core/Camera";
import { ShaderManager } from "./modules";
import { Keyboard } from "./modules/Keyboard";
import { Square } from "./modules/Square";

export type EngineCameraConfig = Omit<CameraConfig, "renderer">;

export interface EngineConfig {
	htmlCanvasId: string;
}

export class Engine {
	private renderer!: WebGLRenderer;
	private shaderManager = new ShaderManager();
	private _keyboard = new Keyboard();

	constructor({ htmlCanvasId }: EngineConfig) {
		this.renderer = new WebGLRenderer(htmlCanvasId);
	}

	public createSquare(color: number[]) {
		const square = new Square({
			renderer: this.renderer,
			shader: this.shaderManager.getSingleColorShader(),
		});

		square.setColor(color);
		return square;
	}

	public clearCanvas(color: number[]) {
		this.renderer.clear(color);
		this.camera.clearViewport();
	}

	public useRenderer(renderer: WebGLRenderer) {
		this.renderer = renderer;
	}

	public setupCamera(config: EngineCameraConfig) {
		const camera = new Camera({ ...config, renderer: this.renderer });
		camera.setup();
		this.renderer.useCamera(camera);
	}

	public get camera(): Camera {
		return this.renderer.getCamera();
	}

	public get keyboard(): Keyboard {
		return this._keyboard;
	}
}
