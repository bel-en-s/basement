"use client";

import { useEffect, useRef } from "react";

export default function HeroShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // ---------- VERTEX ----------
    const vertexShaderSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;

      void main() {
        vUv = vec2((aPosition.x + 1.0) / 2.0, (1.0 - aPosition.y) / 2.0);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // ---------- FRAGMENT (FLUID) ----------
    const fragmentShaderSource = `
      precision mediump float;

      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uMovement;
      uniform vec4 uCoverConfig;
      uniform vec2 uCoverOffset;

      #define TRAIL_SIZE 10
      uniform vec2 uTrail[TRAIL_SIZE];

      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;

        vec2 aspectUv = uv;
        aspectUv.x *= uCoverConfig.x / uCoverConfig.y;

        // Blocky Grid logic
        float grid = 50.0;
        vec2 gridUv = floor(aspectUv * grid) / grid;
        gridUv += 0.5 / grid; // center of cell

        vec2 velocityField = vec2(0.0);
        float influenceSum = 0.0;

        for (int i = 0; i < TRAIL_SIZE; i++) {
          vec2 p = uTrail[i];
          if (p.x < -1.0) continue;

          vec2 aspectP = p;
          aspectP.x *= uCoverConfig.x / uCoverConfig.y;

          float dist = distance(gridUv, aspectP);
          float age = float(i) / float(TRAIL_SIZE);

          float influence = smoothstep(0.15, 0.0, dist) * (1.0 - age);

          vec2 dir = normalize(gridUv - aspectP + 0.0001);

          velocityField += dir * influence;
          influenceSum += influence;
        }

        if (influenceSum > 0.0) {
          velocityField /= influenceSum;
          velocityField *= min(influenceSum, 1.0);
        }

        // Apply grid displacement
        float strength = 0.08; // esto cambia la incidencia
        vec2 displacedUv = uv - velocityField * strength;

        float imgUvX = (displacedUv.x * uCoverConfig.x - uCoverOffset.x) / uCoverConfig.z;
        float imgUvY = (displacedUv.y * uCoverConfig.y - uCoverOffset.y) / uCoverConfig.w;

        vec2 finalUv = vec2(imgUvX, imgUvY);

        vec4 col = vec4(0.0);

        if (finalUv.x >= 0.0 && finalUv.x <= 1.0 && finalUv.y >= 0.0 && finalUv.y <= 1.0) {
          col = texture2D(uTexture, finalUv);
        }

        gl_FragColor = col;
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    // ---------- GEOMETRY ----------
    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);

    const buffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // ---------- UNIFORMS ----------
    const uTime = gl.getUniformLocation(program, "uTime")!;
    const uMovement = gl.getUniformLocation(program, "uMovement")!;
    const uTexture = gl.getUniformLocation(program, "uTexture")!;
    const uCoverConfig = gl.getUniformLocation(program, "uCoverConfig")!;
    const uCoverOffset = gl.getUniformLocation(program, "uCoverOffset")!;
    const uTrailUniform = gl.getUniformLocation(program, "uTrail")!;

    // ---------- TRAIL ----------
    const max = 20;
    const trail = new Float32Array(max * 2);
    for (let i = 0; i < max * 2; i++) trail[i] = -12;

    // ---------- TEXTURE ----------
    const texture = gl.createTexture()!;
    const image = new Image();
    image.src = "/bg-hero.webp";

    let imgW = 1920;
    let imgH = 1080;
    let ready = false;

    image.onload = () => {
      imgW = image.naturalWidth;
      imgH = image.naturalHeight;

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.uniform1i(uTexture, 0);
      ready = true;
      resize();
      canvas.style.opacity = "1";
    };

    // ---------- COVER ----------
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;

      const W = canvas.width;
      const H = canvas.height;

      const imgRatio = imgW / imgH;
      const canvasRatio = W / H;

      let renderW = W;
      let renderH = H;

      if (canvasRatio > imgRatio) renderH = W / imgRatio;
      else renderW = H * imgRatio;

      const dx = (W - renderW) * 0.5;
      const dy = (H - renderH) * -1.7;

      gl.uniform4f(uCoverConfig, W, H, renderW, renderH);
      gl.uniform2f(uCoverOffset, dx, dy);
    };

    window.addEventListener("resize", resize);

    // ---------- INPUT ----------
    let mouse = { x: -10, y: -10, active: false };
    let last = { x: -10, y: -10 };
    let velocity = 0;

    const parent = canvas.parentElement || document.body;

    parent.addEventListener("pointermove", (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
      mouse.active = true;
    });

    parent.addEventListener("pointerleave", () => (mouse.active = false));

    // ---------- LOOP ----------
    let start = performance.now();
    let raf = 0;

    const loop = () => {
      const t = (performance.now() - start) * 0.001;

      const dx = mouse.x - last.x;
      const dy = mouse.y - last.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      last = { ...mouse };

      const target = mouse.active && speed > 0.001 ? 1 : 0;
      // Gentle, slow velocity build-up and fade-out to prevent abrupt jumps
      const decay = target === 1 ? 0.03 : 0.05;
      velocity += (target - velocity) * decay;

      if (mouse.active) {
        if (trail[0] < -1) {
          for (let i = 0; i < max; i++) {
            trail[i * 2] = mouse.x;
            trail[i * 2 + 1] = mouse.y;
          }
        }

        trail[0] += (mouse.x - trail[0]) * 0.4;
        trail[1] += (mouse.y - trail[1]) * 0.4;
      } else {
        trail[0] += (-10 - trail[0]) * 0.1;
        trail[1] += (-10 - trail[1]) * 0.1;
      }

      for (let i = 1; i < max; i++) {
        trail[i * 2] += (trail[(i - 1) * 2] - trail[i * 2]) * 0.4;
        trail[i * 2 + 1] += (trail[(i - 1) * 2 + 1] - trail[i * 2 + 1]) * 0.4;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (ready) {
        gl.uniform2fv(uTrailUniform, trail);
        gl.uniform1f(uTime, t);
        gl.uniform1f(uMovement, velocity);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -9,
        opacity: 0,
        transition: "opacity 0.2s",
      }}
    />
  );
}