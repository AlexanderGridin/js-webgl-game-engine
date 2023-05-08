import { WebGLRenderer } from "../WebGLRenderer";

export interface ShaderSource {
	vertex: string;
	fragment: string;
}

export class Shader {
	private renderer!: WebGLRenderer;

	private shaderSource!: ShaderSource;
	private shaderProgram!: WebGLProgram | null;

	private pixelColorRef!: WebGLUniformLocation | null;
	private vertexPositionRef!: GLint;
	private modelMatrixRef!: WebGLUniformLocation | null;

	constructor({
		pathToVertexShader,
		pathToFragmentShader,
	}: {
		pathToVertexShader: string;
		pathToFragmentShader: string;
	}) {
		const vertexShaderText = this.loadSource(pathToVertexShader);
		const fragmentShaderText = this.loadSource(pathToFragmentShader);

		this.shaderSource = {
			vertex: vertexShaderText,
			fragment: fragmentShaderText,
		};
	}

	public useRenderer(renderer: WebGLRenderer) {
		this.renderer = renderer;
	}

	private loadSource(filePath: string) {
		const req = new XMLHttpRequest();
		req.open("GET", filePath, false);

		try {
			req.send();
		} catch (e) {
			throw new Error("Error during shader source loading");
		}

		const shaderSource = req.responseText;

		if (!shaderSource) {
			throw new Error("Shader source loading failed");
		}

		return shaderSource;
	}

	public init() {
		const gl = this.renderer.getGL();

		// Compile vertex and fragment shaders
		const vertexShader = this.compileShader(
			this.shaderSource.vertex,
			gl.VERTEX_SHADER
		);

		const fragmentShader = this.compileShader(
			this.shaderSource.fragment,
			gl.FRAGMENT_SHADER
		);

		// Create and link the shaders into a program.
		this.shaderProgram = gl.createProgram();

		if (!this.shaderProgram) {
			throw new Error("Error during shader program creation");
		}

		gl.attachShader(this.shaderProgram, vertexShader);
		gl.attachShader(this.shaderProgram, fragmentShader);

		gl.linkProgram(this.shaderProgram);

		// Check for error
		if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
			throw new Error("Error linking shader");
		}

		// Gets reference to aVertexPosition attribute in the shader
		this.vertexPositionRef = gl.getAttribLocation(
			this.shaderProgram,
			"aVertexPosition"
		);

		this.pixelColorRef = gl.getUniformLocation(
			this.shaderProgram,
			"uPixelColor"
		);

		this.modelMatrixRef = gl.getUniformLocation(
			this.shaderProgram,
			"uModelXfromMatrix"
		);
	}

	private compileShader(shaderSource: string, shaderType: number) {
		const gl = this.renderer.getGL();
		// Create shader based on type: vertex or fragment
		const shader = gl.createShader(shaderType);

		if (!shader) {
			throw new Error("Error during shader creation");
		}

		// Compile the created shader
		gl.shaderSource(shader, shaderSource);
		gl.compileShader(shader);

		// Check for errors and return results (null if error)
		// The log info is how shader compilation errors are displayed.
		// This is useful for debugging the shaders.
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			throw new Error(
				`A shader compiling error occured: ${gl.getShaderInfoLog(shader)}`
			);
		}

		return shader;
	}

	// trsMatrix, signifies that it should be
	// a matrix operator containing the concatenated result of
	// translation (T), rotation (R), and scaling (S) or TRS.
	public activate(pixelColor: number[], trsMatrix: any) {
		const gl = this.renderer.getGL();

		// Identify the compiled shader to use
		gl.useProgram(this.shaderProgram);

		gl.vertexAttribPointer(
			this.vertexPositionRef,
			3, // each element is a 3-float (x,y.z)
			gl.FLOAT, // data type is FLOAT
			false, // if the content is normalized vectors
			0, // number of bytes to skip in between elements
			0 // offsets to the first element
		);

		gl.enableVertexAttribArray(this.vertexPositionRef);
		gl.uniform4fv(this.pixelColorRef, pixelColor);
		gl.uniformMatrix4fv(this.modelMatrixRef, false, trsMatrix);
	}
}
