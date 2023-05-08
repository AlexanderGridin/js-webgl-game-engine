import { Engine } from "engine";
import { color } from "./static-data";

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
		this.engine.clearCanvas(color.nord.green);
		this.engine.drawSquare(color.nord.blue);
	}
}
