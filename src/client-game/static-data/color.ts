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

		pink: convertRGBAToWebglRGBA({
			red: 174,
			green: 137,
			blue: 167,
		}),

		yellow: convertRGBAToWebglRGBA({
			red: 235,
			green: 203,
			blue: 139,
		}),
	},
};
