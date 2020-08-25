import React, { FC } from 'react';
import { IonButton } from '@ionic/react';
import { ButtonProps } from '@erp2/ui-shared';

const convertAction = (action: 'solid' | 'outline' | 'flat') : 'clear' | 'outline' | 'solid' | 'default' => {
  switch (action) {
    case 'solid': return 'solid';
    case 'outline': return 'outline';
    case 'flat': return 'clear';
  }
}

const convertStatus = (status: 'primary' | 'success' | 'danger' | 'inverse') : 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark' => {
  switch (status) {
    case 'primary': return 'primary';
    case 'success': return 'success';
    case 'danger' : return 'danger';
    case 'inverse': return 'light';
  }
}

const convertSize = (size: "sm" | "md"): 'small' | 'default' | 'large' => {
  switch (size) {
    case 'sm': return 'small';
    case 'md': return 'large';
  }
}

const keepProps = (props: ButtonProps) => (
  {
    onclick: props.onclick,
  }
)

const convertProps = (props: ButtonProps) => (
  {
    fill: convertAction(props.action),
    color: convertStatus(props.status),
    size: convertSize(props.size),
    ...keepProps(props)
  }
)

export const Button: FC<ButtonProps> = (props: ButtonProps) => (
  <IonButton {...convertProps(props)}>{props.title}</IonButton>
);
