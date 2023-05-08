import { RendererType } from "utils";
import { Renderer } from "./Renderer";
import { Shader } from "./Shader";
import { VertexBuffer } from "./VertexBuffer";

export interface EngineConfig {
	htmlCanvasId: string;
	type: RendererType;
}

export class Engine {
	private renderer!: Renderer;
	// TODO: probably not the best approach...
	private shader!: Shader;

	constructor({ htmlCanvasId, type }: EngineConfig) {
		this.renderer = new Renderer(htmlCanvasId, type);
		this.shader = new Shader(this.renderer.get());
	}

	public async preload() {
		await this.shader.loadSources(
			"glsl-shaders/square-vs.glsl",
			"glsl-shaders/single-color-fs.glsl"
		);
	}

	public drawSquare(color: number[]) {
		const vertexBuffer = new VertexBuffer(this.renderer.get());

		this.renderer
			.useVertexBuffer(vertexBuffer)
			.useShader(this.shader)
			.drawSquare(color);
	}

	public clearCanvas() {
		this.renderer.clear();
	}

	public useRenderer(renderer: Renderer) {
		this.renderer = renderer;
	}
}
