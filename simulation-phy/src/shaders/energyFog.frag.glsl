uniform float uDensity;
uniform vec3 uColor;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float falloff = smoothstep(0.5, 0.0, length(uv));
  gl_FragColor = vec4(uColor, falloff * uDensity);
}
