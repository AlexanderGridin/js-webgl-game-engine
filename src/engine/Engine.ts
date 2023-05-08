import { WebGLRenderer } from "./core";
import { ShaderManager } from "./modules";
import { Square } from "./modules/Square";

export interface EngineConfig {
	htmlCanvasId: string;
}

export class Engine {
	private renderer!: WebGLRenderer;
	private shaderManager = new ShaderManager();

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
	}

	public useRenderer(renderer: WebGLRenderer) {
		this.renderer = renderer;
	}
}
