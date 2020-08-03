import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import React from 'react';

import ExploreContainer from '../components/explore-container';

import styled from 'styled-components';
import { UiMobile } from '@erp2/ui-mobile';

const StyledHome = styled.div``;

export const Home = () => {
  return (
    <StyledHome>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer />
        </IonContent>
      </IonPage>
    </StyledHome>
  );
};

export default Home;
