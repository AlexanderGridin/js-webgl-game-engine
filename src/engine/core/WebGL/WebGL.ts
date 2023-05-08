export class WebGL {
	private canvas!: HTMLCanvasElement;
	private gl!: WebGLRenderingContext;

	constructor(htmlCanvasId: string) {
		this.initCanvas(htmlCanvasId);
		this.initGL();
	}

	private initCanvas(htmlCanvasId: string) {
		const canvas = document.getElementById(htmlCanvasId);

		if (!canvas) {
			throw new Error(
				`[Engine WebGL Error]: HTML canvas with id [${htmlCanvasId} not found in the document]`
			);
		}

		this.canvas = canvas as HTMLCanvasElement;
	}

	private initGL() {
		const gl = this.canvas.getContext("webgl2");

		if (!gl) {
			throw new Error(`[Engine WebGL Error]: WebGL2 is not supported`);
		}

		this.gl = gl;
	}

	public getGL() {
		return this.gl;
	}
}
