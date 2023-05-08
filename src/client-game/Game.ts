import { Engine } from "engine";
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

		pinkSquare.draw();
		blueSquare.draw();

		this.changeSquare();
	}

	private changeSquare() {
		const engine = this.engine;

		setTimeout(() => {
			engine.clearCanvas(color.nord.green);
			const square = engine.createSquare(color.nord.pink);
			square.draw();
		}, 1000);

		setTimeout(() => {
			engine.clearCanvas(color.nord.green);
			const square = engine.createSquare(color.nord.yellow);
			square.draw();
		}, 2000);

		setTimeout(() => {
			engine.clearCanvas(color.nord.green);
			const square = engine.createSquare(color.nord.green);
			square.draw();
		}, 3000);
	}
}
