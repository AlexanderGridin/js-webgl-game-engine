import { Engine } from "engine";
import { Scene } from "engine/core/GameLoop";
import { KeyboardKey } from "engine/modules/Keyboard";
import { Square } from "engine/modules/Square";
import { vec2 } from "gl-matrix";
import { color } from "./static-data";

export class Game implements Scene {
	private engine!: Engine;
	private squares: Square[] = [];

	private scaleDirection = 1;
	private moveDirection = 1;

	constructor(htmlCanvasId: string) {
		this.engine = new Engine({
			htmlCanvasId,
		});
	}

	public init() {
		const engine = this.engine;

		engine.setupCamera({
			center: vec2.fromValues(20, 60),
			width: 20,
			viewport: [20, 40, 600, 300],
		});

		engine.camera.setBGColor(color.nord.yellow);

		this.createSquares();
	}

	private createSquares() {
		const engine = this.engine;

		const blueSq = engine.createSquare(color.nord.blue);
		blueSq.transform.setPosition(10, 60);
		blueSq.transform.setSize(5, 5);

		const redSq = engine.createSquare(color.nord.pink);
		redSq.transform.setPosition(20, 60);
		redSq.transform.setSize(2, 2);

		const tlSq = engine.createSquare(color.nord.green);
		tlSq.transform.setPosition(10, 65);

		const trSq = engine.createSquare(color.nord.green);
		trSq.transform.setPosition(30, 65);

		const brSq = engine.createSquare(color.nord.green);
		brSq.transform.setPosition(30, 55);

		const blSq = engine.createSquare(color.nord.green);
		blSq.transform.setPosition(10, 55);

		this.squares.push(blueSq, redSq, tlSq, trSq, brSq, blSq);
	}

	public draw() {
		const engine = this.engine;
		engine.clearCanvas(color.nord.blue);

		this.squares.forEach((square: Square) => square.draw());
	}

	public update() {
		// this is bad approach and need to be updated in the future
		this.engine.keyboard.update();

		let delta = 0.05;

		const blueSq = this.squares[0];
		const blueSqXPos = blueSq.transform.getXPosition();

		if (blueSqXPos > 30 || blueSqXPos < 10) {
			this.moveDirection *= -1;
		}

		if (this.engine.keyboard.isKeyPressed(KeyboardKey.ArrowRight)) {
			blueSq.transform.incXPositionBy(delta * this.moveDirection);
			blueSq.transform.incRotationByDeg(-1 * this.moveDirection);
		}

		const redSq = this.squares[1];
		const redSqWidth = redSq.transform.getWidth();

		if (redSqWidth > 5 || redSqWidth <= 0) {
			this.scaleDirection *= -1;
		}

		if (this.engine.keyboard.isKeyClicked(KeyboardKey.ArrowUp)) {
			redSq.transform.incSizeBy(0.05 * this.scaleDirection);
		}
	}
}
