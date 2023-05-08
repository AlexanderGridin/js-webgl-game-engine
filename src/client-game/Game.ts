import { Engine } from "engine";
import { mat4, vec3 } from "gl-matrix";
import { color } from "./static-data";

export class Game {
	private engine!: Engine;

	constructor(htmlCanvasId: string) {
		this.engine = new Engine({
			htmlCanvasId,
		});
	}

	public start() {
		const engine = this.engine;

		const blueSquare = engine.createSquare(color.nord.blue);
		const pinkSquare = engine.createSquare(color.nord.pink);

		engine.clearCanvas(color.nord.green);

		const trsMatrix = mat4.create();

		mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(-0.25, 0.25, 0));
		mat4.rotateZ(trsMatrix, trsMatrix, 0.2);
		mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(1.2, 1.2, 1.0));

		pinkSquare.draw(trsMatrix);

		mat4.identity(trsMatrix);

		mat4.translate(trsMatrix, trsMatrix, vec3.fromValues(0.25, -0.25, 0));
		mat4.rotateZ(trsMatrix, trsMatrix, -0.785); // about -45 deg
		mat4.scale(trsMatrix, trsMatrix, vec3.fromValues(0.4, 0.4, 1.0));

		blueSquare.draw(trsMatrix);
	}
}
