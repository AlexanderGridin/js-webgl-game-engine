import { Game } from "client-game";

window.addEventListener("load", () => {
	const game = new Game("canvas");
	game.start();
});
