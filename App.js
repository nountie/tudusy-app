import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'

//Componrnts
import Home from "./views/Home"
import Login from "./views/Login"

import RootStack from './navigators/RootStack'

//styled components
import { Container } from "./styles/appStyles"

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage'

import AppLoading from 'expo-app-loading'
import axios from 'axios'
import consts from 'expo-constants';

import { CredentialsContext } from './components/CredentialsContext'


export default function App() {
  const [ready, setReady] = useState(false);
  const [isLogging, setIsLogging] = useState(true);
  const [storedCredentials, setStoredCredentials] = useState(null);
  const [todos, setTodos] = useState([]);

  //mock todos
  const mock = []

  // const [todos, setTodos] = useState(mock)

  const tryToLogin = () => {
    AsyncStorage
      .getItem("userCredentials")
      .then(result => {
        console.log(result)
        if (result !== null) {
          const todosUrl = `${consts.manifest.extra.apiUrl}/todos`
          const parsedCredentials = JSON.parse(result)
          console.log(parsedCredentials)
          axios.get(todosUrl, {
              headers: {
                  Authorization: `Bearer ${parsedCredentials.accessToken}`
              }
          }).then(({ data }) => {
              setTodos(data)
              setIsLogging(false)
              setStoredCredentials(parsedCredentials)
          }).catch(err => {
              setStoredCredentials(null)
              setIsLogging(false)
          })

        } else {
          setStoredCredentials(null)
          setIsLogging(false)
        }
      })
      .catch(err => console.log(err))
  }


  if (!ready || isLogging) {
    return (
      <AppLoading
        startAsync={tryToLogin}
        onFinish={() => { setReady(true) }}
        onError={console.warn}
      />
    )
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials, todos, setTodos }}>
      <RootStack />
    </CredentialsContext.Provider>
  )

}