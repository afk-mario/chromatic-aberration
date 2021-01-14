export const vertexShader = `
	precision mediump float;

	attribute vec3 aVertexPosition;
	attribute vec2 aTextureCoord;

	uniform mat4 uMVMatrix;
	uniform mat4 uPMatrix;

	uniform mat4 uTextureMatrix0;

	varying vec3 vVertexPosition;
	varying vec2 vTextureCoord;

	void main() {
			gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

			// varyings
			vVertexPosition = aVertexPosition;
			vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
	}
`;

export const fragmentShader = `
		precision mediump float;

		varying vec3 vVertexPosition;
		varying vec2 vTextureCoord;

		uniform sampler2D uSampler0;

		uniform float u_time;
		uniform vec2 u_mouse;

		vec2 p = u_mouse;

		void main() {
				float limit = 0.1;
				float t = u_time * 0.01;
				// p = clamp(p,-0.1,0.1);
				// p = vec2(p.x*1.-step(p.x,limit),p.y*1-step(p.y,limit));
				// p += vec2(sin(t)*0.2, cos(t)*0.2);
				vec2 textureCoord = vTextureCoord;
				vec4 originalR = texture2D(uSampler0, (vTextureCoord) +  p * 1.0);
				vec4 originalG = texture2D(uSampler0, vTextureCoord + p * 0.6);
				vec4 originalB = texture2D(uSampler0, vTextureCoord  + p * 0.2);


				vec4 red = vec4(originalR.r, 0.0, 0.0, 1.0);
				vec4 green = vec4(0.0, originalG.g, 0.0, 1.0);
				vec4 blue = vec4(0.0, 0.0, originalB.b, 1.0);

				gl_FragColor = texture2D(uSampler0, textureCoord);
				gl_FragColor = red + green + blue;
		}
`;
