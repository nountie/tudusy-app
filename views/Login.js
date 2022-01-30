import React, { useState, useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import consts from 'expo-constants';
import { Formik } from 'formik';

import {
    LoginHeader,
    LoginInput,
    LoginButton,
    LoginButtonText,
    LoginInputContainer,
    colors,
    LoginFooterText,
    LoginFooterLink,
    LoginTitle,
    InfoText,
} from '../styles/appStyles';

import { Fontisto } from "@expo/vector-icons";

import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';

const Login = ({navigation}) => {
    const [formInfo, setFormInfo] = useState("")
    const [isLogging, setIsLogging] = useState(false)

    const {storedCredentials, setStoredCredentials, setTodos} = useContext(CredentialsContext)

    const handleLogin = (credentials) => {
        const loginUrl = `${consts.manifest.extra.apiUrl}/login`
        setIsLogging(true)
        axios
            .post(loginUrl, credentials)
            .then(response => {
                const result = response.data
                if(response.status === 200) {

                    AsyncStorage.setItem("userCredentials", JSON.stringify(result))
                        .then(() => {
                            const todosUrl = `${consts.manifest.extra.apiUrl}/todos`
                            axios.get(todosUrl, {
                                headers: {
                                    Authorization: `Bearer ${result.accessToken}`
                                }
                            }).then(({ data }) => {
                                console.log(data)
                                setTodos(data)
                                setStoredCredentials(result)
                            })

                            // AsyncStorage.getItem("storedTodos").then( data => {
                            //     setTodos(JSON.parse(data))
                            //     setStoredCredentials(result)
                            // })
                        })
                        .catch((err) => {
                            console.log(err);
                            setFormInfo('Zostałeś wylogowany! Wpisz swoje dane ponownie.')
                        })
                }

                // console.log(response.status)
                // console.log(result.accessToken)
                // console.log(result.refreshToken)


            })
            .catch(err => {
                setIsLogging(false)
                if([401, 403].includes(err.response.status)) {
                    setFormInfo('Niepoprawne dane logowania!')
                }
            })
    }  
    return (
        <>
            <StatusBar style="light" />
            <LoginHeader>
                <Fontisto name="checkbox-active" size={30} color={colors.tertiary} />
                Tudusy
            </LoginHeader>
            <LoginTitle>Logowanie</LoginTitle>
             <Formik
                initialValues={{ login: "", password: "" }}
                onSubmit={(values) => {
                    handleLogin(values)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <LoginInputContainer>
                            <LoginInput
                                placeholder="Login"
                                placeholderTextColor={colors.primary}
                                selectionColor={colors.secondary}
                                value={values.login}
                                onChangeText={handleChange('login')}
                                onBlur={handleBlur('login')}
                            />
                        </LoginInputContainer>
                        <LoginInputContainer>
                            <LoginInput
                                placeholder="Hasło"
                                placeholderTextColor={colors.primary}
                                selectionColor={colors.secondary}
                                value={values.password}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                        </LoginInputContainer>
                        <InfoText>{ formInfo }</InfoText>
                        <LoginButton onPress={handleSubmit}>
                            { isLogging && <ActivityIndicator size="large" color="white" />}
                            { !isLogging && <LoginButtonText>Zaloguj</LoginButtonText>}
                        </LoginButton>
                    </View>
                )}
            </Formik>
            <LoginFooterText>Nie masz konta? <LoginFooterLink onPress={ () => navigation.navigate("Register") }>Zarejestruj się!</LoginFooterLink></LoginFooterText>
        </>
    );
}

export default Login;