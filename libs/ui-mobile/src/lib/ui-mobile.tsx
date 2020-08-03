import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiMobileProps {}

const StyledUiMobile = styled.div`
  color: pink;
`;

export const UiMobile = (props: UiMobileProps) => {
  return (
    <StyledUiMobile>
      <h1>Welcome to ui-mobile!</h1>
    </StyledUiMobile>
  );
};

export default UiMobile;
