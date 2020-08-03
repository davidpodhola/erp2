import React from 'react';

import styled from 'styled-components';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonIcon,
  IonList,
  IonSelectOption,
  IonSelect,
  IonItem,
  IonLabel,
  IonDatetime
} from '@ionic/react'

/* eslint-disable-next-line */
export interface UiMobileProps {}

const StyledUiMobile = styled.div`
  color: pink;
`;

export const UiMobile = (props: UiMobileProps) => {
  return (
    <StyledUiMobile>
      <h1>Welcome to ui-mobile!</h1>

      <IonList lines="none">
        <IonItem>
          <IonIcon name="calendar" slot="start"></IonIcon>
          <IonLabel>Date Picker</IonLabel>
          <IonDatetime displayFormat="MMM DD, YYYY" max="2056" value={null}></IonDatetime>
        </IonItem>

        <IonItem>
          <IonIcon name="pin" slot="start"></IonIcon>
          <IonLabel>Selector</IonLabel>
          <IonSelect>
            <IonSelectOption value="madison">Madison, WI</IonSelectOption>
            <IonSelectOption value="austin">Austin, TX</IonSelectOption>
            <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
            <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </StyledUiMobile>
  );
};

export default UiMobile;
