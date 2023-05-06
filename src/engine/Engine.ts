import { RendererType } from "utils";
import { Renderer } from "./Renderer";
import { Shader } from "./Shader";
import { shaderSource } from "./Shader/static-data";
import { VertexBuffer } from "./VertexBuffer";

export interface EngineConfig {
	htmlCanvasId: string;
	type: RendererType;
}

export class Engine {
	private renderer!: Renderer;

	constructor({ htmlCanvasId, type }: EngineConfig) {
		this.renderer = new Renderer(htmlCanvasId, type);
	}

	public useRenderer(renderer: Renderer) {
		this.renderer = renderer;
	}

	public clearCanvas() {
		this.renderer.clear();
	}

	public drawSquare() {
		const vertexBuffer = new VertexBuffer(this.renderer.get());

		const shader = new Shader({
			renderer: this.renderer.get(),
			vertexSource: shaderSource.vertexShader,
			fragmentSource: shaderSource.fragmentShader,
		});

		this.renderer.useVertexBuffer(vertexBuffer).useShader(shader).drawSquare();
	}
}
