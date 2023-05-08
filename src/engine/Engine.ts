import { RendererType } from "utils";
import { Renderer } from "./Renderer";
import { Shader, ShaderSource } from "./Shader";
import { VertexBuffer } from "./VertexBuffer";

interface PreloadedData {
	shaderSource: ShaderSource;
}

export interface EngineConfig {
	htmlCanvasId: string;
	type: RendererType;
}

export class Engine {
	private renderer!: Renderer;
	private preloadedData: PreloadedData = {} as PreloadedData;

	constructor({ htmlCanvasId, type }: EngineConfig) {
		this.renderer = new Renderer(htmlCanvasId, type);
	}

	public async preload() {
		this.preloadedData.shaderSource = await Shader.loadSources({
			vertex: "glsl-shaders/square-vs.glsl",
			fragmet: "glsl-shaders/single-color-fs.glsl",
		});
	}

	public drawSquare(color: number[]) {
		const vertexBuffer = new VertexBuffer(this.renderer);
		const shader = new Shader(this.preloadedData.shaderSource);

		this.renderer
			.useVertexBuffer(vertexBuffer)
			.useShader(shader)
			.drawSquare(color);
	}

	public clearCanvas(color: number[]) {
		this.renderer.clear(color);
	}

	public useRenderer(renderer: Renderer) {
		this.renderer = renderer;
	}
}
