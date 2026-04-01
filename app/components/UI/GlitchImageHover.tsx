"use client";
import React, { useRef, useEffect } from "react";
import "./GlitchImageHover.css";

interface GlitchImageHoverProps {
  src: string;
  alt: string;
  className?: string;
}

export default function GlitchImageHover({
  src,
  alt,
  className = "",
}: GlitchImageHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
    });
    if (!gl) return;

    // ---------- SHADERS ----------

    const vertexShader = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = vec2((aPosition.x + 1.0) * 0.5, (1.0 - aPosition.y) * 0.5);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform sampler2D uTexture;
      uniform float uTime;
      uniform float uProgress;
      uniform vec4 uCoverConfig;
      uniform vec2 uCoverOffset;
      
      #define TRAIL_SIZE 20
      uniform vec2 uTrail[TRAIL_SIZE];

      varying vec2 vUv;

      float rand(vec2 co){
        return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = vUv;
        float intensity = uProgress;

        vec2 aspectUv = uv;
        aspectUv.x *= uCoverConfig.x / uCoverConfig.y;

        float grid = 50.0;
        vec2 gridUv = floor(aspectUv * grid) / grid;
        gridUv += 0.5 / grid;

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

        float strength = 0.4 * intensity; 
        vec2 displacedUv = uv - velocityField * strength;

        vec2 imgUv = displacedUv;
        imgUv.x = (imgUv.x * uCoverConfig.x - uCoverOffset.x) / uCoverConfig.z;
        imgUv.y = (imgUv.y * uCoverConfig.y - uCoverOffset.y) / uCoverConfig.w;

        if (imgUv.x < 0.0 || imgUv.x > 1.0 || imgUv.y < 0.0 || imgUv.y > 1.0) {
          gl_FragColor = vec4(0.0);
          return;
        }

        vec4 col = texture2D(uTexture, imgUv);
        
        if (intensity > 0.01) {
          // --- MONOCHROME CONVERSION ---
          float gray = dot(col.rgb, vec3(0.299, 0.587, 0.114));
          vec3 mono = vec3(gray);

          // High contrast mapping
          mono = smoothstep(0.15, 0.85, mono);
          
          float t = uTime * 15.0;

          // V-Sync Jitter / Scanlines
          float scanline = sin(uv.y * 800.0) * 0.05 * intensity;
          mono -= scanline;
          
          // Signal Noise
          float noise = rand(uv + t) * 0.25 * intensity;
          mono += noise;

          // Invert effect for certain blocks to keep some glitchyness
          if (rand(floor(uv * vec2(5.0, 5.0)) + t * 0.5) > 0.85 && intensity > 0.5) {
            mono = 1.0 - mono;
          }

          vec3 finalColor = mix(col.rgb, mono, min(intensity * 1.5, 1.0));
          gl_FragColor = vec4(finalColor, col.a);
        } else {
          gl_FragColor = col;
        }
      }
    `;

    // ---------- WEBGL SETUP ----------

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader));
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1
    ]);

    const buffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime")!;
    const uProgress = gl.getUniformLocation(program, "uProgress")!;
    const uTexture = gl.getUniformLocation(program, "uTexture")!;
    const uCoverConfig = gl.getUniformLocation(program, "uCoverConfig")!;
    const uCoverOffset = gl.getUniformLocation(program, "uCoverOffset")!;
    const uTrailUniform = gl.getUniformLocation(program, "uTrail")!;

    const max = 20;
    const trail = new Float32Array(max * 2);
    for (let i = 0; i < max * 2; i++) trail[i] = -10;

    const texture = gl.createTexture()!;
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";

    let imgW = 1, imgH = 1;
    let ready = false;

    img.onload = () => {
      imgW = img.naturalWidth;
      imgH = img.naturalHeight;

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      ready = true;
    };

    let progress = 0;
    let target = 0;
    let raf: number;
    let mouse = { x: -4, y: -10, active: false };

    const enter = () => {
      target = 1;
      canvas.style.opacity = "1";
    };

    const leave = () => {
      target = 0;
      mouse.active = false;
    };

    const PointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
      mouse.active = true;
    };

    container.addEventListener("pointerenter", enter);
    container.addEventListener("pointerleave", leave);
    container.addEventListener("pointermove", PointerMove);

    const render = (time: number) => {
      progress += (target - progress) * 0.1;

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

      if (progress < 0.01 && target === 0) {
        canvas.style.opacity = "0";
      }

      if (ready && canvas.style.opacity === "1") {
        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        const W = rect.width * dpr;
        const H = rect.height * dpr;

        canvas.width = W;
        canvas.height = H;

        const imgRatio = imgW / imgH;
        const canvasRatio = W / H;

        let renderW = W;
        let renderH = H;

        if (canvasRatio > imgRatio) {
          renderH = W / imgRatio;
        } else {
          renderW = H * imgRatio;
        }

        const dx = (W - renderW) * 0.5;
        const dy = (H - renderH) * 0.5;

        gl.viewport(0, 0, W, H);

        gl.uniform4f(uCoverConfig, W, H, renderW, renderH);
        gl.uniform2f(uCoverOffset, dx, dy);

        gl.uniform1f(uTime, time * 0.001);
        gl.uniform1f(uProgress, progress);
        gl.uniform2fv(uTrailUniform, trail);

        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointerenter", enter);
      container.removeEventListener("pointerleave", leave);
      container.removeEventListener("pointermove", PointerMove);
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`glitch-wrapper ${className}`}>
      <img src={src} alt={alt} className="glitch-base-img" />
      <canvas ref={canvasRef} className="glitch-canvas" />
    </div>
  );
}