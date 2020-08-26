import React from 'react';

import styled from 'styled-components';
import { UiMobile } from '@erp2/ui-mobile';
import { Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

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
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

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
        <Button color={'primary'} variant={'contained'} size={'large'} onClick={() => loginWithRedirect()}>Login...</Button>
        <UiMobile />
      </div>
    </StyledExploreContainer>
  );
};

export default ExploreContainer;
