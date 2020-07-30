import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

const BasicStyles = createGlobalStyle`
  @import url('https://unpkg.com/@clr/ui/clr-ui.min.css');
`;

export const GlobalStyles = () => (
  <>
    <Normalize />
    <BasicStyles />
  </>
);
