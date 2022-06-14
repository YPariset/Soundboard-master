import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Playground from './src/screens/Playground';
import Recording from './src/screens/Recording'
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/core/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  let persistor = persistStore(store);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
              headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.light.background,
              borderTopWidth: 0,
              height: 80,
            },
            tabBarItemStyle: {
              justifyContent: 'center'
            },
            tabBarLabelStyle: {
              fontSize: 10
            },
            tabBarActiveTintColor: colors.green,
            tabBarInactiveTintColor: colors.grey,
            }}>
              <Tab.Screen name="Playground" component={Playground} />
              <Tab.Screen name="Recording" component={Recording} />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
