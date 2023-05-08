attribute vec3 aVertexPosition;
uniform mat4 uModelXfromMatrix;

void main(void) {
	gl_Position = uModelXfromMatrix * vec4(aVertexPosition, 1.0);
}
