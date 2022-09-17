import * as React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import {MAIN_WHITE} from "../../constatnts";
import {addMessageAC, Message} from "../../redux/dialogsReducer";
import MessageTextInputComponent from "./components/MessageTextInputComponent";
import MessagesTopBarComponent from "./components/MessagesTopBarComponent";
import MessagesListComponent from "./components/MessagesListComponent";
import {useEffect} from "react";
import store from "../../redux/store";
import {useState} from "react";
import {connect} from "react-redux";

function UserMessagesPage(props: any) {

    const [messages, setMessages] = useState<Message[]>([])
    const [name, setName] = useState<string>('')

    useEffect(() => {
        let user = store.getState().dialogsPage.dialogs.find(d => {
            if (d.userId === props.route.params.userId) {
                return d
            }
        })
        if (user) {
            setMessages(user.messagesData)
            setName(user.name)
        }
    }, [props])


    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled keyboardVerticalOffset={0}
            >
                <View style={{flex: 1, width: '100%'}}>
                    <MessagesTopBarComponent
                        name={name}
                        navigation={() => props.navigation.replace('Root', {initialRouteName: 'Dialogs'})}
                    />
                    <MessagesListComponent messages={messages}/>
                    <MessageTextInputComponent
                        userId={props.route.params.userId}
                        addMessage={props.addMessage}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: MAIN_WHITE
    },
    keyboardAvoiding: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: MAIN_WHITE
    },
})

const mapStateToProps = (state: any) => {
    return state
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addMessage: (userId: number, messageText: string) => dispatch(addMessageAC(userId, messageText))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMessagesPage)