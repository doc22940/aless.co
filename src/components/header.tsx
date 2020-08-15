import * as React from 'react';
import styled from '@emotion/styled';
import { Surface } from 'gl-react-dom';
import Shaders from './shaders';

const shaders = Object.values(Shaders).map((S, idx) => <S key={idx} />);

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  mix-blend-mode: var(--mixBlendMode2);
`;

const InnerWrapper = styled.span`
  position: absolute;
  top: 0;
  mix-blend-mode: var(--mixBlendMode2);
`;

const Header = (): JSX.Element => {
  return (
    <div data-testid="header-wrapper">
      <Wrapper>
        <InnerWrapper>
          <Surface width={253} height={47}>
            {shaders[0]}
          </Surface>
        </InnerWrapper>
      </Wrapper>
    </div>
  );
};

export default Header;
