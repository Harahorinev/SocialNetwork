import * as React from 'react'
import {View, SafeAreaView, Switch, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native"
import {useEffect, useState} from "react"
import {connect} from "react-redux"
import {setAuthUsersData} from "../redux/authReducer"
import {MAIN_PADDING, SECOND_WHITE} from "../constatnts";
import {authAPI} from "../api/api";

const LoginScreen = (props: any) => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    useEffect(() => {
        authAPI.me().then((response: any) => {
            if (response.data.resultCode === 0) {
                props.setAuthUsersData(response.data.data.email, response.data.data.id, response.data.data.login)
                props.navigation.navigate('Root')
            }
        })
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
                    onPress={() => {
                        authAPI.auth(login, password, rememberMe).then((response: any) => {
                            if (response.data.resultCode === 0) {
                                props.setAuthUsersData(response.data.data.email, response.data.data.id, response.data.data.login)
                                props.navigation.navigate('Root')
                            } else {
                                console.log(response.data.messages[0])
                            //    TODO ADD TOASTS
                            //    npm install react-native-root-toast
                            }
                        })
                    }}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state: any) => {
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

export default connect(mapStateToProps, {setAuthUsersData})(LoginScreen)