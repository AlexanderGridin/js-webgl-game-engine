import { Engine } from "engine";

export class Game {
	private engine!: Engine;

	constructor(htmlCanvasId: string) {
		this.engine = new Engine({
			htmlCanvasId,
			type: "webgl2",
		});
	}

	public async preload() {
		await this.engine.preload();
	}

	public start() {
		this.engine.clearCanvas();
		this.engine.drawSquare();
	}
}
