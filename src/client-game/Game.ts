import { Engine } from "engine";

export class Game {
	constructor(htmlCanvasId: string) {
		const engine = new Engine({
			htmlCanvasId,
			type: "webgl2",
		});

		engine.clearCanvas();
		engine.drawSquare();
	}
}
