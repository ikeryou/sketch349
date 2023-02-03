uniform vec3 color;
uniform float alpha;

void main(void) {
  vec4 dest = vec4(color, 1.0);
  dest.a *= alpha;
  gl_FragColor = dest;
}
