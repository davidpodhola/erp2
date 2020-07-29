import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const SERVER_TIME = gql`
  query {
    now
  }
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
      <h1>
        <span>{new Date(data.now).toString()}</span>
      </h1>
    </div>
  );
};

export default ServerTime;
