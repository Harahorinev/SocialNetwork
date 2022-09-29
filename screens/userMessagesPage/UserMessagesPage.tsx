import * as React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import {MAIN_WHITE} from "../../constatnts";
import {addMessage, Dialog, Message} from "../../redux/dialogsR";
import MessageTextInputComponent from "./components/MessageTextInputComponent";
import MessagesTopBarComponent from "./components/MessagesTopBarComponent";
import MessagesListComponent from "./components/MessagesListComponent";
import {useEffect} from "react";
import {useState} from "react";
import {connect} from "react-redux";
import {AllStateType} from "../../redux/store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../types";
import {RouteProp} from "@react-navigation/native";

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType

type MapStatePropsType = {
    dialogs: Dialog[]
}

type MapDispatchPropsType = {
    addMessage: (userId: number, messageText: string) => {}
}

type OwnPropsType = {
    navigation: NativeStackNavigationProp<RootStackParamList>
    route: RouteProp<RootStackParamList, 'Messages'>
}

function UserMessagesPage(props: Props) {
    const [messages, setMessages] = useState<Message[]>([])
    const [name, setName] = useState<string>('')

    useEffect(() => {
        let user = props.dialogs.find((d: Dialog) => {
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

const mapStateToProps = (state: AllStateType): MapStatePropsType => {
    return state.dialogsPage
}

export default connect<MapStatePropsType, MapDispatchPropsType,
    OwnPropsType, AllStateType>(mapStateToProps, {addMessage})(UserMessagesPage)