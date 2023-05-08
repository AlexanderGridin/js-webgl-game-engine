import { Shader } from "engine/Shader";
import { VertexBuffer } from "engine/VertexBuffer";
import { initRenderer, RendererType } from "utils";

export class Renderer {
	private gl!: WebGLRenderingContext;

	private shader!: Shader;
	private vertexBuffer!: VertexBuffer;

	constructor(htmlCanvasId: string, type: RendererType) {
		this.gl = initRenderer(htmlCanvasId, type) as WebGLRenderingContext;
	}

	public getGL() {
		return this.gl;
	}

	public useShader(shader: Shader) {
		this.shader = shader;

		this.shader.useRenderer(this);
		this.shader.init();

		return this;
	}

	public useVertexBuffer(buffer: VertexBuffer) {
		this.vertexBuffer = buffer;
		return this;
	}

	public getVertexBuffer() {
		return this.vertexBuffer.get();
	}

	public drawSquare(color: number[]) {
		this.shader.activate(color);
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}

	public clear(color: number[]) {
		const [r, g, b, a] = color;

		this.gl.clearColor(r, g, b, a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
}
