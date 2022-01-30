import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import {
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
 } from '@react-navigation/stack'


import Home from "../views/Home"
import Login from "../views/Login"
import Register from "../views/Register"

import { CredentialsContext } from '../components/CredentialsContext'


import {
    colors,
} from '../styles/appStyles';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyled: {
                                backgroundColor: 'transparent'
                            },
                            headerTransparent: true,
                            headerTintColor: colors.tertiary,
                            headerTitle: '',
                            headerMode: 'none',
                            cardStyle: { backgroundColor: colors.primary },
                            // cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                            cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
                            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
                        }}
                        initialRouteName="Login"
                    >
                    {storedCredentials ? (
                        <Stack.Screen name="Home" component={Home} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Register" component={Register} />
                        </>
                    )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    )
}

export default RootStack;