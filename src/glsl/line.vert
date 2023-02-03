uniform float time;
uniform float radius;

void main(){
  vec3 p = position;
  float t = (position.y * position.x) * 1.75 + time * 0.025;
  // float t2 = (position.y * position.x) * 0.35 + time * -0.032;
  p.z += (sin(t) * cos(t * -0.45)) * radius;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
