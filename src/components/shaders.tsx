import * as React from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import useTimer from '../lib/useTimer';

const m = 0.3;
const interval = 2000;

export const shaderObjs = {
  RedWave: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float red;
    void main() {
      gl_FragColor = vec4(red * ${m}, uv.x, uv.y, 1.0);
    }`,
  },
  GreenWave: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float green;
    void main() {
      gl_FragColor = vec4(uv.x, green * ${m}, uv.y, 1);
    }`,
  },
  BlueWave: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float blue;
    void main() {
      gl_FragColor = vec4(uv.x, uv.y, blue * ${m}, 1.0);
    }`,
  },
};

const shaders = Shaders.create(shaderObjs);

const RedWave: React.FC = () => {
  const time = useTimer();
  return (
    <Node
      shader={shaders && shaders.RedWave}
      uniforms={{ red: 0.9 + 0.9 * Math.cos(time / interval) }}
    />
  );
};

const GreenWave: React.FC = () => {
  const time = useTimer();
  return (
    <Node
      shader={shaders && shaders.GreenWave}
      uniforms={{ green: 0.9 + 0.9 * Math.cos(time / interval) }}
    />
  );
};

const BlueWave: React.FC = () => {
  const time = useTimer();
  return (
    <Node
      shader={shaders && shaders.BlueWave}
      uniforms={{ blue: 0.9 + 0.9 * Math.cos(time / interval) }}
    />
  );
};

export default {
  BlueWave: React.memo(BlueWave),
  RedWave: React.memo(RedWave),
  GreenWave: React.memo(GreenWave),
};
