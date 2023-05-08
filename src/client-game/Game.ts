import { Engine } from "engine";
import { convertRGBAToWebglRGBA } from "utils";

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

		const nordBlueColor = convertRGBAToWebglRGBA({
			red: 94,
			green: 129,
			blue: 172,
		});

		this.engine.drawSquare(nordBlueColor);
	}
}
