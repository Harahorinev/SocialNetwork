import * as React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MAIN_WHITE} from "../../../constatnts";

interface Props {
    name: string
    navigation: any
}

const MessagesTopBarComponent = (props: Props) => {
    return (
        <View style={styles.topBar}>

            <TouchableOpacity
                onPress={() => props.navigation()}
            >
                <AntDesign name="left" size={30} color="#4F8EF7"/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            <Text>{props.name}</Text>
            <View style={{flex: 1}}/>
            <AntDesign name="right" size={30} color={'transparent'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        backgroundColor: MAIN_WHITE
    },
})

export default MessagesTopBarComponent