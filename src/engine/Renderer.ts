import { initRenderer, convertRGBAToWebglRGBA } from "../utils";

export class Renderer {
	private renderer = initRenderer("canvas", "webgl2");
	private vertexBuffer = null;
	private readonly shaderSourceCode = {
		vertexShader: `
				attribute vec3 aVertexPosition;
				void main(void) {
					gl_Position = vec4(aVertexPosition, 1.0);
				}
			`,
		fragmentShader: `
				void main(void) {
					gl_FragColor = vec4(${convertRGBAToWebglRGBA({
						red: 94,
						green: 129,
						blue: 172,
					}).join(", ")});
				}
			`,
	};

	private shaderProgram = null;
	private vertexPositionRef = null;

	constructor() {
		this.init();
	}

	public init() {
		this.clear();
		// initialize the GPU vertex buffer with the unit square vertices
		this.initVertexBuffer();
		// Load and compile the vertex and fragment shaders.
		this.initShaderProgram();

		this.drawSquare();
	}

	private clear() {
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

	private initVertexBuffer() {
		// x, y, z coordinate position of the vertex
		const v1 = [0.5, 0.5, 0];
		const v2 = [-0.5, 0.5, 0];
		const v3 = [0.5, -0.5, 0];
		const v4 = [-0.5, -0.5, 0];

		const vertices = [...v1, ...v2, ...v3, ...v4];

		// creates a buffer on the GPU for storing the vertex
		// positions of the square and stores the reference to the GPU buffer
		this.vertexBuffer = this.renderer.createBuffer();

		// activates the newly created buffer
		this.renderer.bindBuffer(this.renderer.ARRAY_BUFFER, this.vertexBuffer);

		// loads the vertex position of the square into the activated buffer on the GPU
		// The keyword STATIC_DRAW informs the drawing hardware that the content of this buffer will not be changed
		this.renderer.bufferData(
			this.renderer.ARRAY_BUFFER,
			new Float32Array(vertices),
			this.renderer.STATIC_DRAW
		);
	}

	private initShaderProgram() {
		// Load and compile vertex and fragment shaders
		const vertexShader = this.compileShader(
			this.shaderSourceCode.vertexShader,
			this.renderer.VERTEX_SHADER
		);

		const fragmentShader = this.compileShader(
			this.shaderSourceCode.fragmentShader,
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

	private compileShader(shaderSourceCode: string, shaderType: any) {
		// Create shader based on type: vertex or fragment
		const shader = this.renderer.createShader(shaderType);

		// Compile the created shader
		this.renderer.shaderSource(shader, shaderSourceCode);
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

	private drawSquare() {
		// Activate the shader
		this.activateShader();
		// Draw
		this.renderer.drawArrays(this.renderer.TRIANGLE_STRIP, 0, 4);
	}

	private activateShader() {
		// Identify the compiled shader to use
		this.renderer.useProgram(this.shaderProgram);

		// Bind vertex buffer to attribute defined in vertex shader
		this.renderer.bindBuffer(this.renderer.ARRAY_BUFFER, this.vertexBuffer);

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
