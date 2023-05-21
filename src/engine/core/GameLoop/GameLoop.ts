export interface Scene {
	draw: () => void;
	update: () => void;
	init: () => void;
}

export class GameLoop {
	private readonly updatesPerSecond = 60; // similar to FPS
	private readonly millisecondsPerFrame = 1000 / this.updatesPerSecond;

	private prevTime!: number;
	private lagTime!: number;

	private isLoopRunning = false;
	private currentScene: Scene | null = null;
	private frameId = -1;

	public start(scene: Scene) {
		if (this.isLoopRunning) {
			throw new Error("[GameLoop]: Game loop already running");
		}

		this.currentScene = scene;
		this.currentScene.init();

		this.prevTime = performance.now();
		this.lagTime = 0;
		this.isLoopRunning = true;
		this.frameId = requestAnimationFrame(this.runLoop.bind(this));
	}

	private runLoop() {
		if (!this.isLoopRunning) {
			return;
		}

		this.frameId = requestAnimationFrame(this.runLoop.bind(this));
		this.currentScene?.draw();

		const currentTime = performance.now();
		const elapsedTime = currentTime - this.prevTime;
		this.prevTime = currentTime;
		this.lagTime += elapsedTime;

		while (this.lagTime >= this.millisecondsPerFrame && this.isLoopRunning) {
			this.currentScene?.update();
			this.lagTime -= this.millisecondsPerFrame;
		}
	}

	public stop() {
		this.isLoopRunning = false;
		cancelAnimationFrame(this.frameId);
	}
}
