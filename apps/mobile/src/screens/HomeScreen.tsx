import { Button, Text, View } from 'react-native';
import React from 'react';

import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
  >;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: Props) => ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
 <Text>This is the home screen</Text>
    <Button
      title="Go to Customers"
      onPress={() => navigation.navigate('Customers')}
    />
</View>
)
