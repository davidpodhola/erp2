import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

export const SERVER_TIME = gql`
  query {
    now
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const ServerTime = () => {
  const { loading, error, data } = useQuery(SERVER_TIME);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log('*** error', error);
    return <p>Error</p>;
  }
  return (
    <div>
      <Title>
        <span>{new Date(data.now).toString()}</span>
      </Title>
    </div>
  );
};

export default ServerTime;
