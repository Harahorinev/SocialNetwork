import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {MessagesData, SECOND_WHITE} from "../../../constatnts";

interface UserDialog {
    name: string
    lastMessage: string
    messages: MessagesData[]
    navigation: any
}

function UserDialogComponent(props: UserDialog) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation()}
        >
            <Text style={styles.nameStyle}>{props.name}</Text>
            <Text numberOfLines={1}>{props.lastMessage}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: SECOND_WHITE
    },
    nameStyle: {
        fontSize: 20,
        fontWeight: '600'
    }
})

export default UserDialogComponent