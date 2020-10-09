import { ServerTime } from '../server.time';
import { Alert, Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';
import * as AuthSession from 'expo-auth-session';
import { auth } from '../client';
import jwtDecode from 'jwt-decode';
import { StackNavigationProp } from '@react-navigation/stack';

const auth0ClientId = `${process.env.EXPO_AUTH0_CLIENTID}`;
const authorizationEndpoint = `https://${process.env.EXPO_AUTH0_DOMAIN}/authorize`;

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

interface Auth0Decoded {
  aud: string | string[];
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  scope: string;
  sub: string;
}

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
  >;

type Props = {
  navigation: LoginScreenNavigationProp;
};


export const LoginScreen = ({ navigation }: Props) => {
  const [name, setName] = React.useState<string>();

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
        audience: '@erpjs',
      },
    },
    { authorizationEndpoint }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`, result);

  React.useEffect(() => {
    if (result) {
      if (result.type === 'error' && result.error) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        console.log('*** result.params', result.params);
        const jwtToken = result.params.access_token;
        auth.token = jwtToken;
        const decoded: Auth0Decoded = jwtDecode(jwtToken);
        console.log('*** decoded', decoded);

        const { sub } = decoded;
        setName(sub);
        navigation.navigate('Home');
      }
    }
  }, [navigation, result]);


  return (
    <>
      {name ? <ServerTime /> : <Text>Log in first</Text>}

      {
        name ? (
          <Button
            mode={`contained`}
            onPress={() => navigation.navigate('Home')}
          >Go to Home</Button>
        ) : (
          <Button
            disabled={!request}
            mode={`contained`}
            onPress={() => promptAsync({ useProxy })}
          >
            Log in with Auth0
          </Button>
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});
