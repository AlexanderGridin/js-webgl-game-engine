export class VertexBuffer {
	public buffer!: WebGLBuffer;

	constructor(renderer: WebGLRenderingContext) {
		// x, y, z coordinate position of the vertex
		const v1 = [0.5, 0.5, 0];
		const v2 = [-0.5, 0.5, 0];
		const v3 = [0.5, -0.5, 0];
		const v4 = [-0.5, -0.5, 0];

		const vertices = [...v1, ...v2, ...v3, ...v4];

		// creates a buffer on the GPU for storing the vertex
		// positions of the square and stores the reference to the GPU buffer
		const buffer = renderer.createBuffer();

		if (!buffer) {
			throw new Error("Error during VertexBuffer creating");
		}

		this.buffer = buffer;

		// activates the newly created buffer
		renderer.bindBuffer(renderer.ARRAY_BUFFER, this.buffer);

		// loads the vertex position of the square into the activated buffer on the GPU
		// The keyword STATIC_DRAW informs the drawing hardware that the content of this buffer will not be changed
		renderer.bufferData(
			renderer.ARRAY_BUFFER,
			new Float32Array(vertices),
			renderer.STATIC_DRAW
		);
	}
}
