import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Playground from './src/screens/Playground';
import Recording from './src/screens/Recording'
import Library from './src/screens/Library';
import SearchFreeSound from './src/screens/SearchFreeSound';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/core/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function App() {
  let persistor = persistStore(store);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Playground') {
                  iconName = focused ? 'game-controller' : 'game-controller-outline';
                } else if (route.name === 'Recording') {
                  iconName = focused ? 'mic' : 'mic-outline';
                } else if (route.name === 'Library') {
                  iconName = focused ? 'grid' : 'grid-outline';
                } else if (route.name === 'Search') {
                  iconName = focused ? 'search' : 'search-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.light.background,
              borderTopWidth: 0,
              height: 80,
            },
            tabBarItemStyle: {
              justifyContent: 'center',
            },
            tabBarLabelStyle: {
              fontSize: 10
              
            },
            tabBarActiveTintColor: colors.green,
            tabBarInactiveTintColor: colors.grey,
            })}>
              <Tab.Screen name="Playground" component={Playground} />
              <Tab.Screen name="Recording" component={Recording} />
              <Tab.Screen name="Library" component={Library} />
              <Tab.Screen name="Search" component={SearchFreeSound} />
            </Tab.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
