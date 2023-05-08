import { Shader } from "engine/Shader";
import { VertexBuffer } from "engine/VertexBuffer";
import { convertRGBAToWebglRGBA, initRenderer, RendererType } from "utils";

export class Renderer {
	private renderer!: WebGLRenderingContext;

	private shader!: Shader;
	private vertexBuffer!: VertexBuffer;

	constructor(htmlCanvasId: string, type: RendererType) {
		this.renderer = initRenderer(htmlCanvasId, type) as WebGLRenderingContext;
	}

	public get() {
		return this.renderer;
	}

	public useShader(shader: Shader) {
		this.shader = shader;
		return this;
	}

	public useVertexBuffer(buffer: VertexBuffer) {
		this.vertexBuffer = buffer;
		return this;
	}

	public drawSquare(color: number[]) {
		this.shader.init();
		this.shader.activate(this.vertexBuffer.buffer, color);
		this.renderer.drawArrays(this.renderer.TRIANGLE_STRIP, 0, 4);
	}

	public clear() {
		// const [r, g, b] = convertRGBToWebGLRGB(76, 86, 106);
		const [r, g, b] = convertRGBAToWebglRGBA({
			red: 164,
			green: 190,
			blue: 140,
		});
		const aplha = 1.0;

		this.renderer.clearColor(r, g, b, aplha);
		this.renderer.clear(this.renderer.COLOR_BUFFER_BIT);
	}
}
