import { convertRGBAToWebglRGBA } from "utils";

export const color = {
	nord: {
		green: convertRGBAToWebglRGBA({
			red: 164,
			green: 190,
			blue: 140,
		}),

		blue: convertRGBAToWebglRGBA({
			red: 94,
			green: 129,
			blue: 172,
		}),
	},
};
