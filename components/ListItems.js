import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import {
    ListView,
    ListViewHidden,
    TodoText,
    TodoTextCenter,
    SwipedTodoText,
    TodoDate,
    HiddenButton,
    StyledView,
    StyledCheck,
    colors
} from "../styles/appStyles"

import { SwipeListView } from "react-native-swipe-list-view"
import { Entypo, Feather } from "@expo/vector-icons";

import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItems = ({ todos, setTodos, handleEdit, setSwipedRows, swipedRows, setTodoIsDone, removeTodo }) => {
    
    const handleDeleteTodo = async (rowKey) => {
        const newTodos = todos.filter(el => el.id !== rowKey)

        try {
            // await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
            await removeTodo(rowKey)
            removeFromSwipedRows(rowKey)
            setTodos(newTodos)
        } catch(err) {
            console.log(err)
        }
    }
    const removeFromSwipedRows = (rowKey) => {
        setSwipedRows(swipedRows.filter(el=> el !== rowKey))
    }
    return (
        <>
            {!todos.length && <TodoTextCenter>No to fajrant!</TodoTextCenter>}
            <SwipeListView
                data={todos}
                renderItem={(data) => {
                    const RowText = data.item.isDone ? SwipedTodoText : TodoText;
                    // const RowText = swipedRows.includes(data.item.id) ? SwipedTodoText : TodoText;
                    return (
                        <ListView
                            underlayColor={"transparent"}
                            onPress={() => {
                                handleEdit(data.item)
                            }}
                        >
                            <>
                                <StyledView>
                                    <RowText>{data.item.description}</RowText>
                                    <TodoDate>{data.item.date}</TodoDate>
                                </StyledView>
                                <StyledCheck
                                    onPress={() => { 
                                        const todoToCheck = todos.find(todo => todo.id === data.item.id);
                                        todoToCheck.isDone = !todoToCheck.isDone
                                        setTodos([...todos])
                                        setTodoIsDone(todoToCheck.id, todoToCheck.isDone ? 1 : 0)
                                    }}
                                ></StyledCheck>
                            </>
                        </ListView>
                    )
                }}
                renderHiddenItem={(data) => {
                    const todoStatusIcon = data.item.isDone ? 'check-square' : 'square';
                    return (<ListViewHidden>
                        <HiddenButton
                            onPress={() => handleDeleteTodo(data.item.id)}
                        >
                            <Entypo name="trash" size={28} color={"#DD2C00"} />
                        </HiddenButton>
                        <HiddenButton>
                            <Feather style={{ marginLeft: data.item.isDone ? 1 : 0, marginRight: "33%" }} name={todoStatusIcon} size={35} color={"#00BFA5"} />
                        </HiddenButton>
                    </ListViewHidden>)
                }}
                leftOpenValue={80}
                disableLeftSwipe={true}
                showsVerticalScrollIndicator={false}
                onRowOpen={(rowKey) => {
                    setSwipedRows([...swipedRows, rowKey])
                }}
                onRowClose={(rowKey) => {
                    removeFromSwipedRows(rowKey)
                }}
                closeOnRowOpen={false}
                closeOnRowPress={false}
                closeOnScroll={false}
            />
        </>
    );
}

export default ListItems;