import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, image, style, Platform } from 'react-native';
import Home from '../screens/Home'
import NewChatScreen from "../screens/NewChatScreen";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

function BottomTabsNavigation() {




    return (
        <Tab.Navigator
            tabBarOptions={{
                tabBarButton: () => null, // Ocultar el botón del tab
                showLabel: false,
                // style: {
                //     position: 'absolute',
                //     bottonm: 25,
                //     left: 20,
                //     right: 20,
                //     borderTopColor: 'tranparent',
                //     borderRadius: 15,
                //     height: 56,
                //     elevation: 0,

                // },
                labelStyle: {
                    fontSize: 11,
                    marginBottom: 3,
                },
                activeTintColor: '#fff',
                inactiveTintColor: 'rgba(255, 255, 255, 0.5)',


            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        height: 56,
                        elevation: 0,
                        position: 'absolute',
                        borderRadius: 100,
                        marginBottom: -100,
                        margin: 10

                    },
                    activeTintColor: '#D71920',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="NewChatScreen"
                component={NewChatScreen}
                options={{
                    tabBarButton: () => null, // Ocultar el botón del tab
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        height: 56,
                        elevation: 0,
                        position: 'absolute',
                        borderRadius: 100,
                        marginBottom: -100,
                        margin: 10

                    },
                    activeTintColor: '#D71920',
                    inactiveTintColor: '#9B9B9B',
                    headerShown: false,
                    tabBarLabel: 'NewChatScreen',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    ),
                }}
            />

        </Tab.Navigator >
    );
}

export default BottomTabsNavigation;
