import * as React from 'react';
import { Surface } from 'gl-react-dom';
import AnimatedColorWave from './animated';

const Header: React.FunctionComponent = () => (
  <div style={{ position: 'absolute', top: '0' }}>
    <Surface width={270} height={42}>
      <AnimatedColorWave />
    </Surface>
  </div>
);

export default Header;