import * as React from 'react'
import {View, SafeAreaView, Switch, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native"
import {useEffect, useState} from "react"
import {connect} from "react-redux"
import {authMe, authResponse} from "../redux/authReducer"
import {MAIN_PADDING, SECOND_WHITE} from "../constatnts";
import {AllStateType} from "../redux/store";

const LoginScreen = (props: any) => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    useEffect(() => {
        props.authMe(() => props.navigation.navigate('Root'))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1, width: '100%', paddingHorizontal: MAIN_PADDING,}}>
                <TextInput
                    placeholder={'Login'}
                    style={{height: 30, width: '100%', borderWidth: 1, paddingHorizontal: 7}}
                    value={login}
                    onChangeText={(value: string) => setLogin(value)}
                />
                <View style={{height: 10}}/>
                <TextInput
                    placeholder={'Password'}
                    style={{height: 30, width: '100%', borderWidth: 1, paddingHorizontal: 7}}
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
                        () => props.navigation.navigate('Root'))}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state: AllStateType) => {
    return {...state}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
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

export default connect(mapStateToProps, {authMe, authResponse})(LoginScreen)