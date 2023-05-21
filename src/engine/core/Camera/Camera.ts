import { WebGLRenderer } from "engine/core";
import { mat4, vec2, vec3 } from "gl-matrix";

enum Point2d {
	X = 0,
	Y = 1,
}

enum Viewport {
	X = 0,
	Y = 1,
	Width = 2,
	Height = 3,
}

export interface CameraConfig {
	center: vec2;
	width: number;
	viewport: number[];
	renderer: WebGLRenderer;
}

export class Camera {
	private renderer!: WebGLRenderer;

	private center!: vec2;
	private width!: number;
	private viewport!: number[];

	private cameraMatrix!: any;

	private bgColor = [0.8, 0.8, 0.8, 1];

	constructor({ center, width, viewport, renderer }: CameraConfig) {
		if (!renderer) {
			throw new Error("[Camera]: Renderer is not provided!");
		}

		this.renderer = renderer;

		this.center = center;
		this.width = width;
		this.viewport = viewport; // [x, y, width, height]

		// Camera transform operator
		this.cameraMatrix = mat4.create();
	}

	public setup() {
		this.setupViewport();
		this.setupCameraTransformMatrix();
	}

	private setupViewport() {
		/*
			OriginX - x position of bottom-left corner of the area to be drawn
			OriginY - y position of bottom-left corner of the area to be drawn
			Width   - width of the area to be drawn
			Height  - height of the area to be drawn
		*/
		const { X, Y, Width, Height } = Viewport;
		const gl = this.renderer.getGL();

		// Set up the viewport: area on canvas to be drawn
		gl.viewport(
			this.viewport[X],
			this.viewport[Y],
			this.viewport[Width],
			this.viewport[Height]
		);

		// Set up the corresponding scessor area to limit the clear area
		gl.scissor(
			this.viewport[X],
			this.viewport[Y],
			this.viewport[Width],
			this.viewport[Height]
		);

		this.clearViewport();
	}

	// TODO: possibly will be removed in the future
	public clearViewport() {
		const gl = this.renderer.getGL();

		// Set the color to be clear
		const [r, g, b, a] = this.bgColor;
		gl.clearColor(r, g, b, a);

		// Enable scissor area, clear and the disable the scissor area
		gl.enable(gl.SCISSOR_TEST);
		// Clear the scissor area
		gl.clear(gl.COLOR_BUFFER_BIT);
		// Since the testing involved in gl.scissor() is computationally expensive, it is disabled immediately after use.
		gl.disable(gl.SCISSOR_TEST);
	}

	private setupCameraTransformMatrix() {
		const center = this.getCenter();

		// After translation, scale to: -1 to 1: a 2x3 square at origin
		mat4.scale(
			this.cameraMatrix,
			mat4.create(),
			vec3.fromValues(2 / this.getWidth(), 2 / this.getHeight(), 1)
		);

		// First translate camera center to the origin
		const { X, Y } = Point2d;
		mat4.translate(
			this.cameraMatrix,
			this.cameraMatrix,
			vec3.fromValues(-center[X], -center[Y], 0)
		);
	}

	public getCameraMatrix() {
		return this.cameraMatrix;
	}

	public getHeight() {
		const { Height, Width } = Viewport;
		const ratio = this.viewport[Height] / this.viewport[Width];

		return this.getWidth() * ratio;
	}

	public getWidth() {
		return this.width;
	}

	public setCenter(x: number, y: number) {
		this.center[0] = x;
		this.center[1] = y;
	}

	public getCenter() {
		return this.center;
	}

	public setWidth(width: number) {
		this.width = width;
	}

	public setViewport(viewport: number[]) {
		this.viewport = viewport;
	}

	public getViewport() {
		return this.viewport;
	}

	public setBGColor(color: number[]) {
		this.bgColor = color;
	}

	public getBGColor() {
		return this.bgColor;
	}
}
