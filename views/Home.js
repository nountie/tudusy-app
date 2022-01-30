import React, { useState, useContext } from 'react'

import { Text } from 'react-native'

import Header from "../components/Header"
import ListItems from "../components/ListItems"
import InputModal from "../components/InputModal"

import {
    Container
} from '../styles/appStyles';

import { StatusBar } from 'expo-status-bar';

import axios from 'axios'
import consts from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext'

const Home = ({ navigation, route }) => {

    const {storedCredentials, setStoredCredentials, todos, setTodos} = useContext(CredentialsContext)
    
    const [modalVisible, setModalVisible] = useState(false)
    const [todoValue, setTodoValue] = useState("")
    const [editedTodo, setEditedTodo] = useState(null)
    const [swipedRows, setSwipedRows] = useState([]);
    
    const logout = () => {
        AsyncStorage.setItem('userCredentials', '')
            .then(() => {
                setStoredCredentials(null)
            })
    }

    const removeTodo = async (id) => {
        const todosUrl = `${consts.manifest.extra.apiUrl}/todos/${id}`
        await axios.delete(todosUrl, {
            headers: {
                Authorization: `Bearer ${storedCredentials.accessToken}`
            },
        })
    }

    const clearDoneTodos = async () => {
        try {
            const todosUrl = `${consts.manifest.extra.apiUrl}/todos`
            const newTodos = todos.filter(el=> !el.isDone)

            // await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))

            // setSwipedRows(swipedRows.filter(rowKey => {
            //         todos.find(todo => todo.id === rowKey)
            //         return !todos.find(todo => todo.id === rowKey).isDone
            //     }
            // ))
            setTodos(newTodos)

            await axios.delete(todosUrl, {
                headers: {
                    Authorization: `Bearer ${storedCredentials.accessToken}`
                },
            })
        } catch(err) {
            console.log(err)
        }
    }


    const addTodo = async (todo) => {
        try {
            const todosUrl = `${consts.manifest.extra.apiUrl}/todos`
            
            // await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
            
            const response = await axios.post(todosUrl, { description: todo.description, date: todo.date }, {
                headers: {
                    Authorization: `Bearer ${storedCredentials.accessToken}`
                },
            })

            const newTodos = [...todos, { id: response.data[0].id, idDone: 0, description: todo.description, date: todo.date }]

            setTodos(newTodos)
            setModalVisible(false)
            setTodoValue("");
            
        } catch(err) {
            console.log(err)
        }
    }

    const setTodoIsDone = (id, value) => {
        const todosUrl = `${consts.manifest.extra.apiUrl}/todos/${id}`
        axios.put(todosUrl, { label: 'isDone', value }, {
            headers: {
                Authorization: `Bearer ${storedCredentials.accessToken}`
            },
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSaveEdit = async (editedTodo) => {
         try {
            const todosUrl = `${consts.manifest.extra.apiUrl}/todos/${editedTodo.id}`
            const editedIndex = todos.findIndex(el => editedTodo.id === el.id)
            todos[editedIndex] = editedTodo
            const newTodos = [...todos]
            // await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
            setTodos(newTodos)
            setModalVisible(false)
            await axios.put(todosUrl, { label: 'description', value: editedTodo.description }, {
                headers: {
                    Authorization: `Bearer ${storedCredentials.accessToken}`
                },
            })
            setEditedTodo(null);
        } catch(err) {
            console.log(err)
        }
    }

    const handleEdit = (todoToEdit) => {
        setEditedTodo(todoToEdit)
        setTodoValue(todoToEdit.description)
        setModalVisible(true)
    }

    return (
        <Container>
            <StatusBar style="light" />
            <Header
                logout={logout}
                clearDoneTodos={clearDoneTodos}
                user={storedCredentials && storedCredentials.user}
            />
            <ListItems
                todos={todos}
                setTodos={setTodos}
                handleEdit={handleEdit}
                swipedRows={swipedRows}
                setSwipedRows={setSwipedRows}
                setTodoIsDone={setTodoIsDone}
                removeTodo={removeTodo}
            />
            <InputModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoValue={todoValue}
                setTodoValue={setTodoValue}
                addTodo={addTodo}
                handleSaveEdit={handleSaveEdit}
                todos={todos}
                editedTodo={editedTodo}
                setEditedTodo={setEditedTodo}
            />
        </Container>
    );
}

export default Home;