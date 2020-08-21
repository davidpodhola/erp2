import '@clr/core/global.css';
import * as React from 'react';
import { GlobalStyles } from '../src/styles';

const ThemeDecorator = (story) => (
  <>
    <link rel="stylesheet" href="https://unpkg.com/@clr/ui/clr-ui.min.css" />
    <GlobalStyles />
    {story()}
  </>
);

export default ThemeDecorator;
