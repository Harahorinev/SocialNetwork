import * as React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform, Image, Dimensions,
} from 'react-native'
import {MAIN_WHITE} from "../../constatnts";
import {actions, Dialog, Message} from "../../redux/dialogsR";
import MessageTextInputComponent from "./components/MessageTextInputComponent";
import MessagesListComponent from "./components/MessagesListComponent";
import {useEffect} from "react";
import {useState} from "react";
import {connect} from "react-redux";
import {AllStateType} from "../../redux/store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../types";
import {RouteProp} from "@react-navigation/native";
import { useHeaderHeight } from '@react-navigation/elements'

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
    const headerHeight = useHeaderHeight()
    const height = Dimensions.get('window').height
    const [messages, setMessages] = useState<Message[]>([])
    const [wasLoad, setWasLoad] = useState<boolean>(false)

    useEffect(() => {
        let user = props.dialogs.find((d: Dialog) => {
            if (d.userId === props.route.params.userId) {
                return d
            }
        })
        if (user) {
            setMessages(user.messagesData)
            // @ts-ignore
            props.navigation.setOptions({title: user.name})
            setWasLoad(true)
        }
        console.log('height', height)
    }, [props])

    if (!wasLoad) {
        return <Image style={{height: 150, width: 150}} source={require('../../assets/images/preLoader.gif')}/>
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enabled keyboardVerticalOffset={Platform.OS === "ios" ? 0 : headerHeight + (height - headerHeight) * 0.047}
            >
                <View style={{flex: 1, width: '100%'}}>
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
    OwnPropsType, AllStateType>(mapStateToProps, {addMessage: actions.addMessage})(UserMessagesPage)
