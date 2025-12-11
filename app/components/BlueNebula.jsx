'use client';

import { useEffect, useRef } from 'react';

// Lightweight WebGL gradient that waves in blue hues for a playful feel.
export default function BlueNebula() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl');
    if (!canvas || !gl) return;

    const vertexSrc = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 1.0, 1.0);
      }
    `;

    const fragmentSrc = `
      precision mediump float;
      varying vec2 vUv;
      uniform float uTime;

      float wave(vec2 p, float speed, float scale) {
        return sin(p.x * scale + uTime * speed) * cos(p.y * scale * 1.2 + uTime * speed * 1.3);
      }

      void main() {
        vec2 p = vUv * 4.0;
        float w1 = wave(p, 0.6, 1.2);
        float w2 = wave(p + 1.2, 0.8, 1.6);
        float glow = smoothstep(0.0, 1.0, 0.5 + 0.5 * (w1 + w2));

        vec3 deep = vec3(0.06, 0.32, 0.62);
        vec3 bright = vec3(0.12, 0.65, 0.98);
        vec3 tint = mix(deep, bright, glow);

        // Soft vignette to keep edges subtle.
        float vignette = smoothstep(0.95, 0.4, distance(vUv, vec2(0.5)));
        gl_FragColor = vec4(tint * vignette, 0.55);
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('WebGL shader error', gl.getShaderInfoLog(shader));
      }
      return shader;
    };

    const program = gl.createProgram();
    const vertShader = createShader(gl.VERTEX_SHADER, vertexSrc);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentSrc);
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    const positionLoc = gl.getAttribLocation(program, 'position');
    const timeLoc = gl.getUniformLocation(program, 'uTime');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    let rafId;
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      const t = (performance.now() - start) * 0.001;
      gl.uniform1f(timeLoc, t);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="glow-canvas" aria-hidden="true" />;
}
