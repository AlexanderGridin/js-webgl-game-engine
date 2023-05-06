import { convertRGBAToWebglRGBA } from "utils";

export const shaderSource = {
	vertexShader: `
				attribute vec3 aVertexPosition;
				void main(void) {
					gl_Position = vec4(aVertexPosition, 1.0);
				}
			`,
	fragmentShader: `
				void main(void) {
					gl_FragColor = vec4(${convertRGBAToWebglRGBA({
						red: 94,
						green: 129,
						blue: 172,
					}).join(", ")});
				}
			`,
};
