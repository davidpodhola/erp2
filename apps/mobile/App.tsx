import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";

const auth0ClientId = "0SNCzIORB4AU2PH9yrgL4EGruu0ZTEny";
const authorizationEndpoint = "https://erpjs.eu.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function App() {
  const [name, setName] = React.useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
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
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);
        console.log('*** decoded', decoded);

        /* const { name } = decoded;
        setName(name); */
      }
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <Text>The mobile application</Text>

      {name ? (
        <Text style={styles.title}>You are logged in, {name}!</Text>
      ) : (
        <Button
          disabled={!request}
          title="Log in with Auth0"
          onPress={() => promptAsync({ useProxy })}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
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
    textAlign: "center",
    marginTop: 40,
  },

});
