import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import SelectProvider from '~/pages/New/SelectProvider';
import SelectDateTime from '~/pages/New/SelectDateTime';
import Confirm from '~/pages/New/Confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function New() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerTintColor: '#fff',
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        name="SelectProvider"
        options={({ navigation }) => ({
          title: 'Selecione o prestador',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        })}
        component={SelectProvider}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={({ navigation }) => ({
          title: 'Selecione o horário',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={({ navigation }) => ({
          title: 'Confirmar agendamento',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const signedIn = useSelector((state) => state.auth.signed);
  return (
    <NavigationContainer>
      {!signedIn ? (
        <>
          <Stack.Navigator>
            <Stack.Screen
              options={{ header: () => null }}
              name="SignIn"
              component={SignIn}
            />
            <Stack.Screen
              options={{ header: () => null }}
              name="SignUp"
              component={SignUp}
            />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Tab.Navigator
            tabBarOptions={{
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255, 0.6)',
              style: {
                backgroundColor: '#8d41a8',
                borderTopColor: 'rgba(141,65,168,0.6)',
              },
            }}
          >
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                tabBarLabel: 'Agendamentos',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="event" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="New"
              component={New}
              options={{
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: () => (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255,255,255,0.6)"
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarLabel: 'Meu Perfil',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="person" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
