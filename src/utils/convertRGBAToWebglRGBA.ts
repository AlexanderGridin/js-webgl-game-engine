interface RGBA {
	red: number;
	green: number;
	blue: number;
	alpha: number;
}

export const convertRGBAToWebglRGBA = ({
	red = 255,
	green = 255,
	blue = 255,
	alpha = 255,
}: Partial<RGBA>) => {
	const colorValues = [red, green, blue, alpha];

	return colorValues.map((value) => {
		return Math.floor((value * 100) / 255) / 100;
	});
};
