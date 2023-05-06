export const initRenderer = (
	htmlElementId: string,
	type: "webgl" | "webgl2" | "2d"
) => {
	const canvas = document.getElementById(htmlElementId) as HTMLCanvasElement;

	if (!canvas) {
		return {} as any;
	}

	if (type === "webgl" || type === "webgl2") {
		return canvas.getContext(type) as WebGLRenderingContext;
	}

	return canvas.getContext(type) as CanvasRenderingContext2D;
};
