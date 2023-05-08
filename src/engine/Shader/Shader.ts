export interface ShaderConfig {
	renderer: WebGLRenderingContext;
}

export class Shader {
	private renderer!: WebGLRenderingContext;

	private shaderProgram!: any;
	private vertexPositionRef!: any;
	private shaderSource!: { vertex: string; fragment: string };

	constructor({ renderer }: ShaderConfig) {
		this.renderer = renderer;
	}

	public async loadSources(vertex: string, fragmet: string): Promise<void> {
		const vertexResponse = await fetch(vertex);
		const vertexText = await vertexResponse.text();

		const fragmentResponse = await fetch(fragmet);
		const fragmentText = await fragmentResponse.text();

		this.shaderSource = {
			vertex: vertexText,
			fragment: fragmentText,
		};
	}

	public init() {
		// Compile vertex and fragment shaders
		const vertexShader = this.compileShader(
			this.shaderSource.vertex,
			this.renderer.VERTEX_SHADER
		);

		const fragmentShader = this.compileShader(
			this.shaderSource.fragment,
			this.renderer.FRAGMENT_SHADER
		);

		// Create and link the shaders into a program.
		this.shaderProgram = this.renderer.createProgram();

		this.renderer.attachShader(this.shaderProgram, vertexShader);
		this.renderer.attachShader(this.shaderProgram, fragmentShader);

		this.renderer.linkProgram(this.shaderProgram);

		// Check for error
		if (
			!this.renderer.getProgramParameter(
				this.shaderProgram,
				this.renderer.LINK_STATUS
			)
		) {
			throw new Error("Error linking shader");
		}

		// Gets reference to aVertexPosition attribute in the shader
		this.vertexPositionRef = this.renderer.getAttribLocation(
			this.shaderProgram,
			"aVertexPosition"
		);
	}

	private compileShader(shaderSource: string, shaderType: number) {
		// Create shader based on type: vertex or fragment
		const shader = this.renderer.createShader(shaderType);

		if (!shader) {
			throw new Error("Error during shader creation");
		}

		// Compile the created shader
		this.renderer.shaderSource(shader, shaderSource);
		this.renderer.compileShader(shader);

		// Check for errors and return results (null if error)
		// The log info is how shader compilation errors are displayed.
		// This is useful for debugging the shaders.
		if (
			!this.renderer.getShaderParameter(shader, this.renderer.COMPILE_STATUS)
		) {
			console.log(this.renderer);
			throw new Error(
				`A shader compiling error occured: ${this.renderer.getShaderInfoLog(
					shader
				)}`
			);
		}

		return shader;
	}

	public activate(vertexBuffer: WebGLBuffer) {
		// Identify the compiled shader to use
		this.renderer.useProgram(this.shaderProgram);

		// Bind vertex buffer to attribute defined in vertex shader
		this.renderer.bindBuffer(this.renderer.ARRAY_BUFFER, vertexBuffer);

		this.renderer.vertexAttribPointer(
			this.vertexPositionRef,
			3, // each element is a 3-float (x,y.z)
			this.renderer.FLOAT, // data type is FLOAT
			false, // if the content is normalized vectors
			0, // number of bytes to skip in between elements
			0 // offsets to the first element
		);

		this.renderer.enableVertexAttribArray(this.vertexPositionRef);
	}
}
