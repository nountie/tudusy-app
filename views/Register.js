import React, { useState, useContext } from 'react'

import {
    LoginHeader,
    LoginInput,
    LoginButton,
    LoginButtonText,
    LoginInputContainer,
    LoginFooterText,
    LoginFooterLink,
    LoginTitle,
    InfoText,
    colors,
} from '../styles/appStyles';

import consts from 'expo-constants';
import { Formik } from 'formik';
import { ActivityIndicator, View } from 'react-native'
import { Fontisto } from "@expo/vector-icons";
import { CredentialsContext } from '../components/CredentialsContext';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
    
    const [formInfo, setFormInfo] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)

    const {setStoredCredentials} = useContext(CredentialsContext)

     const handleRegister = (credentials) => {
        const url = `${consts.manifest.extra.apiUrl}/users`
        setIsRegistering(true)
        axios
            .post(url, credentials)
            .then(response => {
                console.log(response)
                const result = response.data
                if(response.status === 201) {
                    navigation.navigate('Login')
                }
            })
            .catch(err => {
                setIsRegistering(false)
                setFormInfo('Wystąpił błąd!')
            })
    }  

    return (
        <>
            <LoginHeader>
                <Fontisto name="checkbox-active" size={30} color={colors.tertiary} />
                Tudusy
            </LoginHeader>
            <LoginTitle>Rejestracja</LoginTitle>
            <Formik
                initialValues={{ login: "", password: "", passwordAgain: "" }}
                onSubmit={(values) => {
                    if(values.password === values.passwordAgain) {
                        handleRegister(values)
                    } else {
                        setFormInfo('Hasła nie są identyczne!')
                    }
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
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            secureTextEntry={true}
                        />
                    </LoginInputContainer>
                    <LoginInputContainer>
                        <LoginInput
                            placeholder="Powtórz Hasło"
                            placeholderTextColor={colors.primary}
                            selectionColor={colors.secondary}
                            value={values.passwordAgain}
                            onChangeText={handleChange('passwordAgain')}
                            onBlur={handleBlur('passwordAgain')}
                            secureTextEntry={true}
                        />
                    </LoginInputContainer>
                    <InfoText>{ formInfo }</InfoText>
                    <LoginButton onPress={handleSubmit}>
                        { isRegistering && <ActivityIndicator size="large" color="white" />}
                        { !isRegistering && <LoginButtonText>Zarejestruj się</LoginButtonText>}
                    </LoginButton>
                </View>
                )}
            </Formik>
            <LoginFooterText>Masz już konto? <LoginFooterLink onPress={ () => navigation.navigate("Login") }>Zaloguj się!</LoginFooterLink></LoginFooterText>
        </>
    );
}

export default Register;