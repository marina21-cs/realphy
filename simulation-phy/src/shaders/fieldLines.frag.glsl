uniform float uTime;
uniform vec3 uColor;
varying vec3 vPos;

void main() {
  float pulse = 0.55 + 0.45 * sin(uTime * 3.0 + vPos.y * 8.0);
  vec3 color = uColor * pulse;
  gl_FragColor = vec4(color, 0.75 * pulse);
}
