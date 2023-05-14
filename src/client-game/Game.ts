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

		let x = 0;
		let bx = 0;
		let speed = 0.005;
		let rot = 0;
		let brot = 0;

		const pinkSquare = engine.createSquare(color.nord.pink);
		const blueSquare = engine.createSquare(color.nord.blue);

		const animate = () => {
			engine.clearCanvas(color.nord.green);

			if (x >= 0.5 || x <= -0.5) {
				speed *= -1;
			}

			pinkSquare.getTransform().setPosition((x += speed), (x += speed));
			pinkSquare.getTransform().setSize(0.4, 0.4);
			pinkSquare.getTransform().setRotationInDeg((rot += 1));
			pinkSquare.draw();

			blueSquare.getTransform().setPosition((bx += speed), (bx += speed) * -1);
			blueSquare.getTransform().setSize(0.3, 0.3);
			blueSquare.getTransform().setRotationInDeg((brot -= 1));
			blueSquare.draw();

			requestAnimationFrame(animate);
		};

		animate();
	}
}
