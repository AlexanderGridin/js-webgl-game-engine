export type RendererType = "webgl" | "webgl2" | "2d";

export const initRenderer = (htmlElementId: string, type: RendererType) => {
	const canvas = document.getElementById(htmlElementId) as HTMLCanvasElement;

	if (!canvas) {
		throw new Error("Canvas not found during initRenderer");
	}

	if (type === "webgl" || type === "webgl2") {
		return canvas.getContext(type) as WebGLRenderingContext;
	}

	return canvas.getContext(type) as CanvasRenderingContext2D;
};
