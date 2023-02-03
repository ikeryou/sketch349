uniform sampler2D tDiffuse;
uniform float alpha;

varying vec2 vUv;


void main(void) {

  vec4 dest = texture2D(tDiffuse, vUv);
  dest.a *= alpha;

  gl_FragColor = dest;

}
