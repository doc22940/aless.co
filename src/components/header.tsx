/* istanbul ignore file */
import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from '@emotion/styled';
import { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-dom';
import useTimer from '../lib/useTimer';
import ThemeShaders, { shaderObjs } from './shaders';

const mixBlendMode = { mixBlendMode: `var(--mixBlendMode2)` } as any;
const shaderComponents = Object.values(ThemeShaders).map((S, idx) => (
  <S key={idx} />
));

const Header: React.FC = () => {
  const [shader, setShader] = React.useState(0);

  if (typeof document !== `undefined`) {
    (window as any).__onShaderChange = () => {
      setShader(parseInt((window as any).__shader, 10));
    };

    React.useEffect(() => {
      setShader(parseInt((window as any).__shader, 10));
    });
  }

  const scope = {
    styled,
    shaderObjs,
    Shaders,
    Node,
    GLSL,
    shader,
    useTimer,
    shaderComponents,
    Surface,
  };
  // console.log(shaders);
  // const _ = Object.keys(shaders)[shader];

  const code = `
  const m = 0.3;
  const shaders = Shaders.create({RedWave: {
    frag: GLSL\`
    precision highp float;
    varying vec2 uv;
    uniform float red;
    void main() {
      gl_FragColor = vec4(red * \${m}, uv.x, uv.y, 1.0);
    }\`,
  },});
  const interval = 2000;

  const RedWave = () => {
    const time = useTimer();
    return (
      <Node
        shader={shaders && shaders.RedWave}
        uniforms={{ red: 0.9 + 0.9 * Math.cos(time / interval) }}
      />
    );
  };

  render(<Surface width={253} height={47}><RedWave /></Surface>)
`;

  // const randomize = () => Math.floor(Math.random() * shaderComponents.length);
  // const getRadomShader = () => {
  //   const lastRandom = shader;
  //   let random = randomize();
  //   while (random === lastRandom) {
  //     random = randomize();
  //   }
  //   return random;
  // };

  return (
    <>
      <div>
        <span>
          {/* <Surface width={253} height={47}>
            {shaderComponents[shader]}
          </Surface> */}
          <LiveProvider code={code} scope={scope} noInline={true}>
            <LiveEditor
              style={{
                padding: '0',
                background: 'blue',
                borderRadius: '5px',
                fontFamily: 'GT Pressura Mono Regular',
                fontSize: '14px',
              }}
            />
            <LiveError />
            <LivePreview
              style={{ position: 'absolute', top: '0', ...mixBlendMode }}
            />
          </LiveProvider>
        </span>
      </div>
      {/* <button
        style={{
          float: 'right',
        }}
        onClick={() => (window as any).__setPreferredShader(getRadomShader())}
      >
        <span>♻️</span>
      </button> */}
    </>
  );
};

export default Header;
