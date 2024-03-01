// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UserScreen from './Screens/UserScreen';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerContent from './DrawerContent';
import SplashScreen from 'react-native-splash-screen'
import Login from './Screens/Login&Register/Login';
import Register from './Screens/Login&Register/Register';
import ClinicDetails from './Screens/Login&Register/ClinicDetails';
import AsyncStorage from "@react-native-async-storage/async-storage";


const StackNav = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();
    return (
        <Stack.Navigator initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                // statusBarColor:"pink",
                statusBarAnimation: 'slide',
                headerStyle: {
                    backgroundColor: "#0163d2"
                },
                headerTintColor: "white",
                headerTitleAlign: 'center',
                headerLeft: () => {
                    return (
                        <Icon
                            name='menu'
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
                            size={30}
                            color="#fff" />
                    )
                }
            }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{

            }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="Login" component={Login} />

        </Stack.Navigator>
    )
}


const DrawerNav = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent{...props} />}
            screenOptions={{
                headerShown: false
            }}>
            {/* <Drawer.Screen name='Home' component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="User" component={UserScreen} /> */}
            <Drawer.Screen name='Home' component={StackNav} />

        </Drawer.Navigator>
    )
}

const LoginNav = () => {
    const Stack = createNativeStackNavigator();

    return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={DrawerNav} />
        {/* <Stack.Screen name="ClinicDetails" component={ClinicDetails}/> */}
    </Stack.Navigator>)
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    async function getData() {
        const data = await AsyncStorage.getItem('isLoggedIn')
        // console.log(data);
        setIsLoggedIn(data)
    }
    const Drawer = createDrawerNavigator();
    const useEffect = () => {
        getData()
        setTimeout(() => {
            SplashScreen.hide();
        }, 500)
    }
    useEffect()
    return (
        // <NavigationContainer>
        //     {/* <StackNav/> */}
        //     <DrawerNav />
        // </NavigationContainer>
        // <Login/>
        <NavigationContainer>
            {isLoggedIn?<DrawerNav/>:<LoginNav/>}
        </NavigationContainer>
    );
}

export default App;