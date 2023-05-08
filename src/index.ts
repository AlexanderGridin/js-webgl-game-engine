import { Game } from "client-game";

window.addEventListener("load", async () => {
	const game = new Game("canvas");
	await game.preload();
	game.start();
});
