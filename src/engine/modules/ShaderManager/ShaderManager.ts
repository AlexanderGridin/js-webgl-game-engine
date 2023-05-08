import { Shader } from "engine/core";

export class ShaderManager {
	private singleColorShader!: Shader;

	constructor() {
		this.init();
	}

	private init() {
		this.createShaders();
	}

	public getSingleColorShader() {
		return this.singleColorShader;
	}

	private createShaders() {
		this.createSingleColorShader();
	}

	private createSingleColorShader() {
		this.singleColorShader = new Shader({
			pathToVertexShader: "glsl-shaders/square-vs.glsl",
			pathToFragmentShader: "glsl-shaders/single-color-fs.glsl",
		});
	}
}
