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

const IonWrapper = ({ children }) => {
  return (
    <IonApp>
      <IonPage>
        <IonContent>{children}</IonContent>
      </IonPage>
    </IonApp>
  );
};

addDecorator((storyFn) => <IonWrapper>{storyFn()}</IonWrapper>);
configure(require.context('../src/lib', true, /\.stories\.(j|t)sx?$/), module);
