export enum KeyboardKey {
	ArrowLeft = "ArrowLeft",
	ArrowRight = "ArrowRight",
	ArrowUp = "ArrowUp",
	ArrowDown = "ArrowDown",
}

export class Keyboard {
	private supportedKeys: string[] = [
		KeyboardKey.ArrowDown,
		KeyboardKey.ArrowUp,
		KeyboardKey.ArrowRight,
		KeyboardKey.ArrowLeft,
	];

	// records the key states from the previous update cycle
	private readonly previousKeysStateMap: Record<string, boolean> = {};
	// records the current state of the keys
	private readonly pressedKeysMap: Record<string, boolean> = {};
	// records (captures) click events
	private readonly clickedKeysMap: Record<string, boolean> = {};

	constructor() {
		window.addEventListener("keyup", this.handleKeyUp.bind(this));
		window.addEventListener("keydown", this.handleKeyDown.bind(this));
	}

	public update(): void {
		this.supportedKeys.forEach((key: string) => {
			this.clickedKeysMap[key] =
				!this.previousKeysStateMap[key] && this.pressedKeysMap[key];

			this.previousKeysStateMap[key] = this.pressedKeysMap[key];
		});
	}

	public isKeyPressed(key: KeyboardKey): boolean {
		return this.pressedKeysMap[key];
	}

	public isKeyClicked(key: KeyboardKey): boolean {
		return this.clickedKeysMap[key];
	}

	private handleKeyDown(event: KeyboardEvent): void {
		this.pressedKeysMap[event.key] = true;
	}

	private handleKeyUp(event: KeyboardEvent): void {
		this.pressedKeysMap[event.key] = false;
	}
}
