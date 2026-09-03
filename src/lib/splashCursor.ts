// Page-level GPU Navier-Stokes fluid simulation overlay
// Vanilla WebGL2 / WebGL1 fallback solver

export interface SplashCursorOptions {
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  shading?: boolean;
  colorUpdateSpeed?: number;
  rainbow?: boolean;
  color?: string; // hex color e.g. "#617467"
  intensity?: number;
  maxDpr?: number;
  idleStopMs?: number;
  respectReducedMotion?: boolean;
  zIndex?: number;
  mount?: HTMLElement;
}

export interface SplashCursorController {
  canvas: HTMLCanvasElement | null;
  running: boolean;
  splat: (x: number, y: number, dx: number, dy: number, color?: { r: number; g: number; b: number }) => void;
  set: (partial: Partial<SplashCursorOptions>) => void;
  destroy: () => void;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((x) => x + x).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255
  };
}

export function splashCursor(customConfig: SplashCursorOptions = {}): SplashCursorController {
  const config: Required<SplashCursorOptions> = {
    simResolution: 128,
    dyeResolution: 1024,
    densityDissipation: 2.8,
    velocityDissipation: 2.0,
    pressure: 0.1,
    pressureIterations: 20,
    curl: 14,
    splatRadius: 0.18,
    splatForce: 5500,
    shading: true,
    colorUpdateSpeed: 10,
    rainbow: false,
    color: '#aebbaa',
    intensity: 0.22,
    maxDpr: 2,
    idleStopMs: 4000,
    respectReducedMotion: true,
    zIndex: 50,
    mount: typeof document !== 'undefined' ? document.body : (null as unknown as HTMLElement),
    ...customConfig
  };

  if (typeof window === 'undefined') {
    return {
      canvas: null,
      running: false,
      splat: () => {},
      set: () => {},
      destroy: () => {}
    };
  }

  // Check reduced motion
  if (
    config.respectReducedMotion &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return {
      canvas: null,
      running: false,
      splat: () => {},
      set: () => {},
      destroy: () => {}
    };
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = `${config.zIndex}`;
  config.mount.appendChild(canvas);

  const glParams = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false
  };

  let gl = (canvas.getContext('webgl2', glParams) ||
    canvas.getContext('webgl', glParams) ||
    canvas.getContext('experimental-webgl', glParams)) as WebGLRenderingContext | WebGL2RenderingContext | null;

  if (!gl) {
    canvas.remove();
    return {
      canvas: null,
      running: false,
      splat: () => {},
      set: () => {},
      destroy: () => {}
    };
  }

  const isWebGL2 = 'WebGL2RenderingContext' in window && gl instanceof WebGL2RenderingContext;
  let extHalfFloat: any = null;
  let extLinear: any = null;

  if (isWebGL2) {
    const gl2 = gl as WebGL2RenderingContext;
    gl2.getExtension('EXT_color_buffer_float');
    extLinear = gl2.getExtension('OES_texture_float_linear');
  } else {
    extHalfFloat = gl.getExtension('OES_texture_half_float');
    extLinear = gl.getExtension('OES_texture_half_float_linear');
  }

  gl.clearColor(0, 0, 0, 0);

  // Shader source compiler helpers
  function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
    const s = glCtx.createShader(type)!;
    glCtx.shaderSource(s, source);
    glCtx.compileShader(s);
    if (!glCtx.getShaderParameter(s, glCtx.COMPILE_STATUS)) {
      console.error(glCtx.getShaderInfoLog(s));
      glCtx.deleteShader(s);
      return null;
    }
    return s;
  }

  function createProgram(glCtx: WebGLRenderingContext, vsSource: string, fsSource: string) {
    const vs = createShader(glCtx, glCtx.VERTEX_SHADER, vsSource);
    const fs = createShader(glCtx, glCtx.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;
    const prog = glCtx.createProgram()!;
    glCtx.attachShader(prog, vs);
    glCtx.attachShader(prog, fs);
    glCtx.linkProgram(prog);
    if (!glCtx.getProgramParameter(prog, glCtx.LINK_STATUS)) {
      console.error(glCtx.getProgramInfoLog(prog));
      return null;
    }
    return prog;
  }

  const baseVertexShader = `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const copyShaderSource = `
    precision highp float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `;

  const clearShaderSource = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `;

  const splatShaderSource = `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
    }
  `;

  const advectionShaderSource = `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform float dt;
    uniform float dissipation;

    void main () {
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      gl_FragColor = dissipation * texture2D(uSource, coord);
      gl_FragColor.a = 1.0;
    }
  `;

  const divergenceShaderSource = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;

      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }

      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `;

  const curlShaderSource = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
  `;

  const vorticityShaderSource = `
    precision highp float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;

      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;

      vec2 vel = texture2D(uVelocity, vUv).xy;
      gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
  `;

  const pressureShaderSource = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `;

  const gradientSubtractSource = `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `;

  const displayShader = `
    precision highp float;
    precision mediump sampler2D;
    ${config.shading ? '#define SHADING' : ''}
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
    uniform vec2 texelSize;

    void main () {
      vec3 c = texture2D(uTexture, vUv).rgb * intensity;
      
      #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
      #endif

      float a = max(c.r, max(c.g, c.b));
      gl_FragColor = vec4(c, a);
    }
  `;

  // Programs compilation
  const copyProgram = createProgram(gl, baseVertexShader, copyShaderSource);
  const clearProgram = createProgram(gl, baseVertexShader, clearShaderSource);
  const splatProgram = createProgram(gl, baseVertexShader, splatShaderSource);
  const advectionProgram = createProgram(gl, baseVertexShader, advectionShaderSource);
  const divergenceProgram = createProgram(gl, baseVertexShader, divergenceShaderSource);
  const curlProgram = createProgram(gl, baseVertexShader, curlShaderSource);
  const vorticityProgram = createProgram(gl, baseVertexShader, vorticityShaderSource);
  const pressureProgram = createProgram(gl, baseVertexShader, pressureShaderSource);
  const gradSubtractProgram = createProgram(gl, baseVertexShader, gradientSubtractSource);
  const displayProgram = createProgram(gl, baseVertexShader, displayShader);

  if (
    !copyProgram ||
    !clearProgram ||
    !splatProgram ||
    !advectionProgram ||
    !divergenceProgram ||
    !curlProgram ||
    !vorticityProgram ||
    !pressureProgram ||
    !gradSubtractProgram ||
    !displayProgram
  ) {
    console.warn('Fluid simulation shaders failed to compile.');
    canvas.remove();
    return {
      canvas: null,
      running: false,
      splat: () => {},
      set: () => {},
      destroy: () => {}
    };
  }

  // Quad Geometry
  const quadVBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW
  );
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  function blit(target: any, clear = false) {
    if (target == null) {
      gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    } else {
      gl!.viewport(0, 0, target.width, target.height);
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo);
    }
    if (clear) {
      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
    }
    gl!.bindBuffer(gl!.ARRAY_BUFFER, quadVBO);
    gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
    gl!.enableVertexAttribArray(0);
    gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
  }

  // Double-buffered FBO utilities
  interface FBO {
    texture: WebGLTexture;
    fbo: WebGLFramebuffer;
    width: number;
    height: number;
    texelSizeX: number;
    texelSizeY: number;
    attach: (id: number) => number;
  }

  interface DoubleFBO {
    width: number;
    height: number;
    texelSizeX: number;
    texelSizeY: number;
    read: FBO;
    write: FBO;
    swap: () => void;
  }

  function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
    gl!.activeTexture(gl!.TEXTURE0);
    const texture = gl!.createTexture()!;
    gl!.bindTexture(gl!.TEXTURE_2D, texture);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, param);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, param);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl!.createFramebuffer()!;
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
    gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
    gl!.viewport(0, 0, w, h);
    gl!.clear(gl!.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX: 1.0 / w,
      texelSizeY: 1.0 / h,
      attach(id: number) {
        gl!.activeTexture(gl!.TEXTURE0 + id);
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
        return id;
      }
    };
  }

  function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);

    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      get read() {
        return fbo1;
      },
      set read(value) {
        fbo1 = value;
      },
      get write() {
        return fbo2;
      },
      set write(value) {
        fbo2 = value;
      },
      swap() {
        const temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      }
    };
  }

  // Format selection
  const texType = isWebGL2
    ? (gl as WebGL2RenderingContext).HALF_FLOAT
    : extHalfFloat
    ? extHalfFloat.HALF_FLOAT_OES
    : gl.FLOAT;
  const rgbaInternalFormat = isWebGL2 ? (gl as WebGL2RenderingContext).RGBA16F : gl.RGBA;
  const rgInternalFormat = isWebGL2 ? (gl as WebGL2RenderingContext).RG16F : gl.RGBA;
  const rInternalFormat = isWebGL2 ? (gl as WebGL2RenderingContext).R16F : gl.RGBA;
  const filterType = extLinear ? gl.LINEAR : gl.NEAREST;

  let density: DoubleFBO;
  let velocity: DoubleFBO;
  let divergence: FBO;
  let curl: FBO;
  let pressure: DoubleFBO;

  function initFramebuffers() {
    const width = gl!.drawingBufferWidth;
    const height = gl!.drawingBufferHeight;
    const aspect = width / height;

    const simWidth = aspect >= 1 ? Math.round(config.simResolution * aspect) : config.simResolution;
    const simHeight = aspect >= 1 ? config.simResolution : Math.round(config.simResolution / aspect);

    const dyeWidth = aspect >= 1 ? Math.round(config.dyeResolution * aspect) : config.dyeResolution;
    const dyeHeight = aspect >= 1 ? config.dyeResolution : Math.round(config.dyeResolution / aspect);

    density = createDoubleFBO(dyeWidth, dyeHeight, rgbaInternalFormat, gl!.RGBA, texType, filterType);
    velocity = createDoubleFBO(simWidth, simHeight, rgInternalFormat, isWebGL2 ? (gl as WebGL2RenderingContext).RG : gl!.RGBA, texType, filterType);
    divergence = createFBO(simWidth, simHeight, rInternalFormat, isWebGL2 ? (gl as WebGL2RenderingContext).RED : gl!.RGBA, texType, gl!.NEAREST);
    curl = createFBO(simWidth, simHeight, rInternalFormat, isWebGL2 ? (gl as WebGL2RenderingContext).RED : gl!.RGBA, texType, gl!.NEAREST);
    pressure = createDoubleFBO(simWidth, simHeight, rInternalFormat, isWebGL2 ? (gl as WebGL2RenderingContext).RED : gl!.RGBA, texType, gl!.NEAREST);
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);
    const width = Math.floor(window.innerWidth * dpr);
    const height = Math.floor(window.innerHeight * dpr);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      initFramebuffers();
      return true;
    }
    return false;
  }

  resizeCanvas();

  // Splat into fields
  const splatStack: Array<{ x: number; y: number; dx: number; dy: number; color?: { r: number; g: number; b: number } }> = [];

  function splatInternal(x: number, y: number, dx: number, dy: number, color?: { r: number; g: number; b: number }) {
    if (!gl) return;
    const aspect = canvas.width / canvas.height;
    let inkColor = color;
    if (!inkColor) {
      inkColor = hexToRgb(config.color);
    }

    // Splat velocity
    gl.useProgram(splatProgram);
    gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), velocity.read.attach(0));
    gl.uniform1f(gl.getUniformLocation(splatProgram, 'aspectRatio'), aspect);
    gl.uniform2f(gl.getUniformLocation(splatProgram, 'point'), x / window.innerWidth, 1.0 - y / window.innerHeight);
    gl.uniform3f(gl.getUniformLocation(splatProgram, 'color'), dx, -dy, 0.0);
    gl.uniform1f(gl.getUniformLocation(splatProgram, 'radius'), (config.splatRadius / 100.0) * (aspect > 1 ? 1 : aspect));
    blit(velocity.write);
    velocity.swap();

    // Splat dye
    gl.useProgram(splatProgram);
    gl.uniform1i(gl.getUniformLocation(splatProgram, 'uTarget'), density.read.attach(0));
    gl.uniform3f(gl.getUniformLocation(splatProgram, 'color'), inkColor.r, inkColor.g, inkColor.b);
    blit(density.write);
    density.swap();
  }

  // Animation Loop State
  let lastUpdateTime = performance.now();
  let lastInputTime = performance.now();
  let animationFrameId: number | null = null;
  let isRunning = false;

  function step(dt: number) {
    if (!gl) return;
    gl.disable(gl.BLEND);

    // 1. Curl
    gl.useProgram(curlProgram);
    gl.uniform2f(gl.getUniformLocation(curlProgram, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gl.getUniformLocation(curlProgram, 'uVelocity'), velocity.read.attach(0));
    blit(curl);

    // 2. Vorticity Confinement
    gl.useProgram(vorticityProgram);
    gl.uniform2f(gl.getUniformLocation(vorticityProgram, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gl.getUniformLocation(vorticityProgram, 'uVelocity'), velocity.read.attach(0));
    gl.uniform1i(gl.getUniformLocation(vorticityProgram, 'uCurl'), curl.attach(1));
    gl.uniform1f(gl.getUniformLocation(vorticityProgram, 'curl'), config.curl);
    gl.uniform1f(gl.getUniformLocation(vorticityProgram, 'dt'), dt);
    blit(velocity.write);
    velocity.swap();

    // 3. Divergence
    gl.useProgram(divergenceProgram);
    gl.uniform2f(gl.getUniformLocation(divergenceProgram, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gl.getUniformLocation(divergenceProgram, 'uVelocity'), velocity.read.attach(0));
    blit(divergence);

    // 4. Pressure decay & Jacobi solve
    gl.useProgram(clearProgram);
    gl.uniform1i(gl.getUniformLocation(clearProgram, 'uTexture'), pressure.read.attach(0));
    gl.uniform1f(gl.getUniformLocation(clearProgram, 'value'), config.pressure);
    blit(pressure.write);
    pressure.swap();

    gl.useProgram(pressureProgram);
    gl.uniform2f(gl.getUniformLocation(pressureProgram, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gl.getUniformLocation(pressureProgram, 'uDivergence'), divergence.attach(0));
    for (let i = 0; i < config.pressureIterations; i++) {
      gl.uniform1i(gl.getUniformLocation(pressureProgram, 'uPressure'), pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    // 5. Gradient Subtract
    gl.useProgram(gradSubtractProgram);
    gl.uniform2f(gl.getUniformLocation(gradSubtractProgram, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gl.getUniformLocation(gradSubtractProgram, 'uPressure'), pressure.read.attach(0));
    gl.uniform1i(gl.getUniformLocation(gradSubtractProgram, 'uVelocity'), velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    // 6. Advection (Velocity & Dye)
    gl.useProgram(advectionProgram);
    gl.uniform2f(gl.getUniformLocation(advectionProgram, 'texelSize'), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uVelocity'), velocity.read.attach(0));
    gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uSource'), velocity.read.attach(0));
    gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dt'), dt);
    gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dissipation'), 1.0 / (1.0 + config.velocityDissipation * dt));
    blit(velocity.write);
    velocity.swap();

    gl.useProgram(advectionProgram);
    gl.uniform2f(gl.getUniformLocation(advectionProgram, 'texelSize'), density.texelSizeX, density.texelSizeY);
    gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uVelocity'), velocity.read.attach(0));
    gl.uniform1i(gl.getUniformLocation(advectionProgram, 'uSource'), density.read.attach(1));
    gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dissipation'), 1.0 / (1.0 + config.densityDissipation * dt));
    blit(density.write);
    density.swap();
  }

  function render() {
    if (!gl) return;
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    gl.useProgram(displayProgram);
    if (config.shading) {
      gl.uniform2f(gl.getUniformLocation(displayProgram, 'texelSize'), density.texelSizeX, density.texelSizeY);
    }
    gl.uniform1i(gl.getUniformLocation(displayProgram, 'uTexture'), density.read.attach(0));
    gl.uniform1f(gl.getUniformLocation(displayProgram, 'intensity'), config.intensity);
    blit(null);
  }

  function update() {
    const now = performance.now();
    const dt = Math.min((now - lastUpdateTime) / 1000, 1 / 30);
    lastUpdateTime = now;

    // Process splats
    while (splatStack.length > 0) {
      const s = splatStack.shift()!;
      splatInternal(s.x, s.y, s.dx, s.dy, s.color);
    }

    step(dt);
    render();

    // Idle stop check
    if (now - lastInputTime > config.idleStopMs) {
      isRunning = false;
      animationFrameId = null;
      return;
    }

    animationFrameId = requestAnimationFrame(update);
  }

  function startLoop() {
    lastInputTime = performance.now();
    if (!isRunning) {
      isRunning = true;
      lastUpdateTime = performance.now();
      animationFrameId = requestAnimationFrame(update);
    }
  }

  // Pointer input handling
  let lastPointerX = -1;
  let lastPointerY = -1;
  let pointerDown = false;

  function onPointerMove(e: PointerEvent | MouseEvent) {
    startLoop();
    const x = e.clientX;
    const y = e.clientY;

    if (lastPointerX === -1 || lastPointerY === -1) {
      lastPointerX = x;
      lastPointerY = y;
      return;
    }

    const dx = ((x - lastPointerX) / window.innerWidth) * config.splatForce;
    const dy = ((y - lastPointerY) / window.innerHeight) * config.splatForce;

    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      splatStack.push({ x, y, dx, dy });
    }

    lastPointerX = x;
    lastPointerY = y;
  }

  function onPointerDown(e: PointerEvent | MouseEvent) {
    startLoop();
    pointerDown = true;
    const x = e.clientX;
    const y = e.clientY;
    lastPointerX = x;
    lastPointerY = y;

    // Click burst: strong radial kick
    const rgb = hexToRgb(config.color);
    const burstColor = { r: rgb.r * 1.5, g: rgb.g * 1.5, b: rgb.b * 1.5 };
    const kickX = (Math.random() - 0.5) * 1200;
    const kickY = (Math.random() - 0.5) * 1200;
    splatStack.push({ x, y, dx: kickX, dy: kickY, color: burstColor });
  }

  function onPointerUp() {
    pointerDown = false;
  }

  function onResize() {
    resizeCanvas();
    startLoop();
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('resize', onResize);

  // Subtle natural attract mode on load (12-second cap)
  let attractFrameId: number | null = null;
  const attractStartTime = performance.now();
  let attractActive = true;

  function stopAttract() {
    attractActive = false;
    if (attractFrameId) {
      cancelAnimationFrame(attractFrameId);
      attractFrameId = null;
    }
  }

  function runAttract(time: number) {
    if (!attractActive) return;
    const elapsed = (time - attractStartTime) / 1000;
    if (elapsed > 6) {
      stopAttract();
      return;
    }

    // Lissajous fluid curve trace
    const t = elapsed;
    const cx = window.innerWidth * (0.5 + 0.35 * Math.sin(t * 1.8));
    const cy = window.innerHeight * (0.45 + 0.25 * Math.sin(t * 2.3 + 0.5));
    const prevCx = window.innerWidth * (0.5 + 0.35 * Math.sin((t - 0.016) * 1.8));
    const prevCy = window.innerHeight * (0.45 + 0.25 * Math.sin((t - 0.016) * 2.3 + 0.5));

    const force = config.splatForce * 0.45;
    const dx = ((cx - prevCx) / window.innerWidth) * force;
    const dy = ((cy - prevCy) / window.innerHeight) * force;

    splatStack.push({ x: cx, y: cy, dx, dy });
    startLoop();

    attractFrameId = requestAnimationFrame(runAttract);
  }

  // Stop attract mode as soon as real user moves pointer
  const userInteractionHandler = () => {
    stopAttract();
    window.removeEventListener('pointermove', userInteractionHandler);
    window.removeEventListener('pointerdown', userInteractionHandler);
  };
  window.addEventListener('pointermove', userInteractionHandler, { once: true, passive: true });
  window.addEventListener('pointerdown', userInteractionHandler, { once: true, passive: true });

  attractFrameId = requestAnimationFrame(runAttract);

  startLoop();

  return {
    canvas,
    get running() {
      return isRunning;
    },
    splat(x: number, y: number, dx: number, dy: number, color?: { r: number; g: number; b: number }) {
      splatStack.push({ x, y, dx, dy, color });
      startLoop();
    },
    set(partial: Partial<SplashCursorOptions>) {
      Object.assign(config, partial);
      startLoop();
    },
    destroy() {
      stopAttract();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', userInteractionHandler);
      window.removeEventListener('pointerdown', userInteractionHandler);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      if (gl) {
        const loseExt = gl.getExtension('WEBGL_lose_context');
        if (loseExt) loseExt.loseContext();
      }

      if (canvas && canvas.parentNode) {
        canvas.remove();
      }
    }
  };
}
