import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';

export const SERVER_TIME = gql`
  query {
    now
  }
`;

export const ServerTime = () => {
  const { loading, error, data } = useQuery(SERVER_TIME);

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.log('*** error', error);
    return <Text>Error</Text>;
  }
  return <Text>{new Date(data.now).toString()}</Text>;
};
