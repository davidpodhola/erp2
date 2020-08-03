import React from 'react';

import styled from 'styled-components';
import { UiMobile } from '@erp2/ui-mobile';

const StyledExploreContainer = styled.div`
  .container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .container strong {
    font-size: 20px;
    line-height: 26px;
  }

  .container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }

  .container a {
    text-decoration: none;
  }
`;

export const ExploreContainer = () => {
  return (
    <StyledExploreContainer>
      <div className="container">
        <strong>Ready to create an app?</strong>
        <p>
          Start with Ionic{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components"
          >
            UI Components
          </a>
        </p>
        <UiMobile />
      </div>
    </StyledExploreContainer>
  );
};

export default ExploreContainer;
