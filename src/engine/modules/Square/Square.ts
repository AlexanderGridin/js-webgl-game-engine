import { Shader, VertexBuffer, WebGLRenderer } from "engine/core";

export interface SquareConfig {
	renderer: WebGLRenderer;
	shader: Shader;
}

export class Square {
	private shader!: Shader;
	private renderer!: WebGLRenderer;

	private color = [1, 1, 1, 1];

	constructor({ renderer, shader }: SquareConfig) {
		this.renderer = renderer;
		this.shader = shader;
	}

	public draw() {
		this.renderer.useVertexBuffer(new VertexBuffer());
		this.renderer.useShader(this.shader);

		this.shader.activate(this.color);

		const gl = this.renderer.getGL();
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

	public setColor(color: number[]) {
		this.color = color;
	}

	public getColor() {
		return this.color;
	}
}
