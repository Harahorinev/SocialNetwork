import * as React from 'react'
import {View, SafeAreaView, Switch, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native"
import {useEffect, useState} from "react"
import {connect} from "react-redux"
import {authMe, authResponse} from "../redux/authR"
import {MAIN_PADDING, SECOND_WHITE} from "../constatnts";
import {AllStateType} from "../redux/store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../types";
import {RouteProp} from "@react-navigation/native";

type Props = DispatchProps & OwnProps

type StateProps = {}

type DispatchProps = {
    authMe: (navigation: () => void) => {}
    authResponse: (login: string,
                   password: string,
                   rememberMe: boolean,
                   navigation: () => void) => void
}

type OwnProps = {
    navigation: NativeStackNavigationProp<RootStackParamList>
    route: RouteProp<RootStackParamList, 'Login'>
}

const LoginScreen = (props: Props) => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    useEffect(() => {
        props.authMe(() => props.navigation.replace('Root'))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, width: '100%', paddingHorizontal: MAIN_PADDING, paddingVertical: 30,}}>
                <TextInput
                    placeholder={'Login'}
                    style={{height: 35, width: '100%', borderWidth: 1, paddingHorizontal: 7, fontSize: 14}}
                    value={login}
                    onChangeText={(value: string) => setLogin(value)}
                />
                <View style={{height: 10}}/>
                <TextInput
                    placeholder={'Password'}
                    style={{height: 35, width: '100%', borderWidth: 1, paddingHorizontal: 7, fontSize: 14,}}
                    value={password}
                    onChangeText={(value: string) => setPassword(value)}
                />
                <View style={{height: 10}}/>
                <View style={{height: 30, width: '100%', flexDirection: 'row', alignItems: 'center',}}>
                    <Text>Remember me</Text>
                    <Switch
                        trackColor={{false: "#767577", true: "#81b0ff"}}
                        thumbColor={rememberMe ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => setRememberMe(!rememberMe)}
                        value={rememberMe}
                    />
                </View>
                <View style={{height: 10}}/>
                <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={() => props.authResponse(
                        login, password, rememberMe,
                        () => props.navigation.replace('Root'))}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    loginBtn: {
        height: 30,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: SECOND_WHITE
    }
})

export default connect<StateProps, DispatchProps,
    OwnProps, AllStateType>(null, {authMe, authResponse})(LoginScreen)
