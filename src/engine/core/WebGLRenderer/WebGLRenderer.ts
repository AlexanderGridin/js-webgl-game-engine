import { Shader } from "../Shader";
import { VertexBuffer } from "../VertexBuffer";
import { WebGL } from "../WebGL";

export class WebGLRenderer {
	private gl!: WebGLRenderingContext;

	constructor(htmlCanvasId: string) {
		this.gl = new WebGL(htmlCanvasId).getGL();
	}

	public getGL() {
		return this.gl;
	}

	public useShader(shader: Shader) {
		shader.useRenderer(this);
		shader.init();
	}

	public useVertexBuffer(buffer: VertexBuffer) {
		buffer.useRenderer(this);
		buffer.init();

		// Bind vertex buffer to attribute defined in vertex shader
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer.get());
	}

	public clear(color?: number[]) {
		if (!color) {
			this.gl.clearColor(1, 1, 1, 1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);

			return;
		}

		const [r, g, b, a] = color;

		this.gl.clearColor(r, g, b, a);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
	}
}
