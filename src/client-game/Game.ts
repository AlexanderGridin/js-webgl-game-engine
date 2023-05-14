import { Engine } from "engine";
import { vec2 } from "gl-matrix";
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

		engine.clearCanvas(color.nord.blue);

		engine.setupCamera({
			center: vec2.fromValues(20, 60),
			width: 20,
			viewport: [20, 40, 600, 300],
		});

		const blueSq = engine.createSquare([0.25, 0.25, 0.95, 1]);

		blueSq.getTransform().setPosition(20, 60);
		// blueSq.getTransform().setRotationInRad(-0.2);
		blueSq.getTransform().setSize(5, 5);
		blueSq.draw();

		const redSq = engine.createSquare([1, 0.25, 0.25, 1]);

		redSq.getTransform().setPosition(20, 60);
		redSq.getTransform().setSize(2, 2);
		redSq.draw();

		const tlSq = engine.createSquare([0.9, 0.1, 0.1, 1]);

		tlSq.getTransform().setPosition(10, 65);
		tlSq.draw();

		const trSq = engine.createSquare([0.1, 0.9, 0.1, 1]);

		trSq.getTransform().setPosition(30, 65);
		trSq.draw();

		const brSq = engine.createSquare([0.1, 0.1, 0.9, 1]);

		brSq.getTransform().setPosition(30, 55);
		brSq.draw();

		const blSq = engine.createSquare([0.1, 0.1, 0.1, 1]);

		blSq.getTransform().setPosition(10, 55);
		blSq.draw();
	}
}
