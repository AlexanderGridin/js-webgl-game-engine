import { mat4, vec2, vec3 } from "gl-matrix";

export class Transform {
	private position = vec2.fromValues(0, 0);
	private scale = vec2.fromValues(1, 1);
	private rotationInRad = 0.0;

	public setPosition(x: number, y: number) {
		this.setXPosition(x);
		this.setYPosition(y);
	}

	public getXPosition() {
		return this.position[0];
	}

	public setXPosition(x: number) {
		this.position[0] = x;
	}

	public incXPositionBy(delta: number) {
		this.setXPosition(this.getXPosition() + delta);
	}

	private setYPosition(y: number) {
		this.position[1] = y;
	}

	public getPosition() {
		return this.position;
	}

	public setSize(width: number, height: number) {
		this.setWidth(width);
		this.setHeight(height);
	}

	public getWidth() {
		return this.scale[0];
	}

	private setWidth(width: number) {
		this.scale[0] = width;
	}

	public getHeight() {
		return this.scale[1];
	}

	private setHeight(height: number) {
		this.scale[1] = height;
	}

	public getSize() {
		return this.scale;
	}

	public incSizeBy(delta: number) {
		this.setWidth(this.getWidth() + delta);
		this.setHeight(this.getHeight() + delta);
	}

	public setRotationInRad(rotation: number) {
		this.rotationInRad = rotation;

		while (this.rotationInRad > 2 * Math.PI) {
			this.rotationInRad -= 2 * Math.PI;
		}
	}

	public getRotationInRad() {
		return this.rotationInRad;
	}

	public setRotationInDeg(rotation: number) {
		this.setRotationInRad(rotation * (Math.PI / 180));
	}

	public incRotationByDeg(deg: number) {
		const currentRotationInRad = this.getRotationInRad();
		const deltaInRad = deg * (Math.PI / 180);
		this.setRotationInRad(currentRotationInRad + deltaInRad);
	}

	public getTRSMatrix() {
		const matrix = mat4.create();

		const [xPos, yPos] = this.getPosition();
		mat4.translate(matrix, matrix, vec3.fromValues(xPos, yPos, 0));

		mat4.rotateZ(matrix, matrix, this.getRotationInRad());

		const [width, height] = this.getSize();
		mat4.scale(matrix, matrix, vec3.fromValues(width, height, 1));

		return matrix;
	}
}
