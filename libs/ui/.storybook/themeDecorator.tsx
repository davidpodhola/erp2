import * as React from 'react';
import { GlobalStyles } from '../src/styles';
import theme from '../src/styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const ThemeDecorator = (story) => (
  <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <CssBaseline />
    {story()}
      </ThemeProvider>
  </>
);

export default ThemeDecorator;
