import '@clr/core/global.css';
import * as React from 'react';
import { GlobalStyles } from '../src/styles';

const ThemeDecorator = (story) => (
  <>
    <GlobalStyles />
    {story()}
  </>
)

export default ThemeDecorator;
