uniform sampler2D tA;
uniform sampler2D tB;
uniform float alpha;
uniform vec2 maskStartA;
uniform vec2 maskEndA;
uniform vec2 maskStartB;
uniform vec2 maskEndB;
uniform vec2 maskStartC;
uniform vec2 maskEndC;

varying vec2 vUv;

void main(void) {
  vec4 dest = vec4(0.0);

  if(vUv.x >= maskStartA.x && vUv.y >= maskStartA.y && vUv.x <= maskEndA.x && vUv.y <= maskEndA.y) {
    dest += texture2D(tA, vUv);
  }

  if(vUv.x >= maskStartB.x && vUv.y >= maskStartB.y && vUv.x <= maskEndB.x && vUv.y <= maskEndB.y) {
    dest += texture2D(tB, vUv);
  }

  if(dest.a >= 0.75) {
    dest = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    // dest = vec4(1.0, 1.0, 1.0, step(0.5, dest.a));
    dest = vec4(1.0, 1.0, 1.0, smoothstep(0.5, dest.a, 0.75));
  }

  // if(vUv.x >= maskStartA.x && vUv.y >= maskStartA.y && vUv.x <= maskEndA.x && vUv.y <= maskEndA.y && vUv.x >= maskStartB.x && vUv.y >= maskStartB.y && vUv.x <= maskEndB.x && vUv.y <= maskEndB.y) {
  //   dest.rgb = 1.0 - dest.rgb;
  //   dest.a = 1.0;
  // }


  // if(vUv.x >= maskStartC.x && vUv.y >= maskStartC.y && vUv.x <= maskEndC.x && vUv.y <= maskEndC.y) {
  //   dest.rgb = 1.0 - dest.rgb;
  // }

  dest.a *= alpha;
  gl_FragColor = dest;
}
