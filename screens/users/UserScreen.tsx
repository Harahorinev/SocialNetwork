import * as React from 'react'
import {StyleSheet, Text, View, SafeAreaView} from "react-native";
import {MAIN_WHITE} from "../../constatnts";
import MessagesTopBarComponent from "../userMessagesPage/components/MessagesTopBarComponent";
import {useEffect, useState} from "react";
import {profileAPI} from "../../api/api";

const UserScreen = (props: any) => {
    const [userName, setUserName] = useState<string>('')
    // const [ava, setAva] = useState()

    useEffect(() => {
        profileAPI.getProfile(props.route.params.id).then((data: any) => {
            setUserName(data.fullName)
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <MessagesTopBarComponent name={'Profile'}
                                     navigation={() => props.navigation.replace('Root', {initialRouteName: 'Users'})}/>
            <View>
                <Text>{userName ? userName : ''}</Text>
            </View>
            {/*<AvaDescriptionComponent ava={} description={} addPost={}/>*/}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: MAIN_WHITE
    },
})

export default UserScreen