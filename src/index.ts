import { Game } from "client-game";
import { GameLoop } from "engine/core/GameLoop";

window.addEventListener("load", () => {
	const gameLoop = new GameLoop();
	gameLoop.start(new Game("canvas"));
});
