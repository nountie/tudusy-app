import React from 'react'
import  { Modal } from 'react-native'

import {
    ModalButton,
    ModalContainer,
    ModalView,
    StyledInput,
    ModalAction,
    ModalActionGroup,
    ModalIcon,
    ModalTitle,
    colors
} from '../styles/appStyles';

import { AntDesign } from '@expo/vector-icons'

const InputModal = ({ modalVisible, setModalVisible, todoValue, setTodoValue, addTodo, todos, handleSaveEdit, editedTodo, setEditedTodo }) => {

    const handleSubmit = () => {
        if(editedTodo) {
            handleSaveEdit({...editedTodo, description: todoValue})
        } else {
            addTodo({
                description: todoValue,
                date: getDate(),
                // id: `${(todos.length && parseInt(todos[todos.length-1].id) + 1) || "1"}`
            });
        }
    }
    const handleClose = () => { 
        setModalVisible(false);
        setTodoValue("");
        setEditedTodo(null);
    }

    const today = (d) => { 
        return ((d.getDate() < 10)?"0":"") + d.getDate() +"/"+(((d.getMonth()+1) < 10)?"0":"") + (d.getMonth()+1) +"/"+ d.getFullYear();
    }

    const timeNow = (d) => {
        return ((d.getHours() < 10)?"0":"") + d.getHours() +":"+ ((d.getMinutes() < 10)?"0":"") + d.getMinutes() +":"+ ((d.getSeconds() < 10)?"0":"") + d.getSeconds();
    }
    const getDate = () => {
        const d = new Date();
        return `${today(d)} ${timeNow(d)}`
    }

    return (
        <>
            <ModalButton onPress={() => { setModalVisible(true) }}>
                <AntDesign name="plus" size={32} color={colors.secondary} />
            </ModalButton>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { handleClose }}
            >
                <ModalContainer>
                    <ModalView>
                        <ModalIcon>
                            <ModalTitle>
                                <AntDesign name="edit" size={32} color={colors.tertiary} />
                                {editedTodo ? "Edytuj Tudus" : "Nowy Tudus"}
                            </ModalTitle>
                        </ModalIcon>
                        <StyledInput
                            placeholder="Wpisz tudusa"
                            placeholderTextColor={colors.primary}
                            selectionColor={colors.secondary}
                            autoFocus={true}
                            onChangeText={(text) => { setTodoValue(text) }}
                            value={todoValue}
                            onSubmitEditing={handleSubmit}
                        />
                        <ModalActionGroup>
                            <ModalAction
                                color={colors.secondary}
                                onPress={handleClose}
                                >
                                <AntDesign name="close" size={32} color={colors.primary} />
                            </ModalAction>
                            <ModalAction
                                color={colors.tertiary}
                                onPress={handleSubmit}
                            >
                                <AntDesign name="check" size={32} color={colors.primary} />
                            </ModalAction>
                        </ModalActionGroup>
                    </ModalView>
                </ModalContainer>
            </Modal>
        </>
    );
}

export default InputModal;