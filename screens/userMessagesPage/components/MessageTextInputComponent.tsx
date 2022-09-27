import * as React from 'react'
import {Keyboard, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {MAIN_WHITE, SECOND_WHITE} from "../../../constatnts";
import Feather from 'react-native-vector-icons/Feather';

interface Props {
    userId: number
    addMessage: (userId: number, messageText: string) => {}
}

const MessageTextInputComponent = (props: Props) => {
    const [newMessage, setNewMessage] = useState<string>('')

    return (
        <View style={styles.textInputContainer}>
        <TextInput
            style={styles.textInput}
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(text) => setNewMessage(text)}
            value={newMessage}
        />
        <View style={{width: 10}}/>
        <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => {
                props.addMessage(props.userId, newMessage)
                setNewMessage('')
            }}
        >
            <Feather name="send" color="#4F8EF7" size={20}/>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        height: 60,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: SECOND_WHITE
    },
    textInput: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#F0F0F0'
    },
    sendBtn: {
        height: 40,
        aspectRatio: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'grey',
        backgroundColor: MAIN_WHITE,
    },
})

export default MessageTextInputComponent