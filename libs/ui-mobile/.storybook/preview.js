import React, { useState } from 'react';
import { addDecorator, configure } from '@storybook/react';
import { IonApp, IonContent, IonPage, IonList, IonButton } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import theme from '../../ui/src/styles/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const IonWrapper = ({ children }) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>{children}</IonContent>
      </IonPage>
    </IonApp>
  );
};

addDecorator((storyFn) => (
  <>
    {' '}
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <ThemeProvider theme={theme}>
      {' '}
      <CssBaseline />
      <IonWrapper>{storyFn()}</IonWrapper>
    </ThemeProvider>
  </>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
