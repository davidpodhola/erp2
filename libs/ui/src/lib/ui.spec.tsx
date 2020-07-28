import React from 'react';
import { render } from '@testing-library/react';

import Ui from './ui';
import { MockedProvider } from '@apollo/client/testing';

describe(' Ui', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MockedProvider addTypename={false}>
        <Ui/>
      </MockedProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <MockedProvider addTypename={false}>
        <Ui/>
      </MockedProvider>
    );

    expect(getByText('Welcome to ui!')).toBeTruthy();
  });

});
