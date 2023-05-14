import { Shader, VertexBuffer, WebGLRenderer } from "engine/core";
import { Transform } from "../Transform";

export interface SquareConfig {
	renderer: WebGLRenderer;
	shader: Shader;
}

export class Square {
	private renderer!: WebGLRenderer;
	private shader!: Shader;
	private vertexBuffer = new VertexBuffer();

	private transform = new Transform();

	private color = [1, 1, 1, 1];

	constructor({ renderer, shader }: SquareConfig) {
		this.renderer = renderer;
		this.shader = shader;
	}

	public draw() {
		this.renderer.useVertexBuffer(this.vertexBuffer);
		this.renderer.useShader(this.shader);

		this.shader.activate(
			this.color,
			this.transform.getTRSMatrix(),
			this.renderer.getCamera().getCameraMatrix()
		);

		const gl = this.renderer.getGL();
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

	public setColor(color: number[]) {
		this.color = color;
		return this;
	}

	public getColor() {
		return this.color;
	}

	public getTransform() {
		return this.transform;
	}
}
