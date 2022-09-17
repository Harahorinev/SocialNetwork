import * as React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SECOND_WHITE} from "../../../constatnts";

const UserComponentForList = (props: any) => {
    return (
        <View style={styles.userContainer}>
            {props.photos.large
                ? <Image
                    style={{height: 30, width: 30,}}
                    source={{uri: props.photos.large}}
                />
                : null
            }

            <View>
                <TouchableOpacity onPress={() => props.navigation()}>
                    <Text style={styles.nameStyle}>{props.name}</Text>
                </TouchableOpacity>
                <View style={{height: 5}}/>
                <TouchableOpacity onPress={() => props.followStatusChanger(props.id)}>
                    <Text>{props.followed ? 'follow' : 'unfollow'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userContainer: {
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        backgroundColor: SECOND_WHITE
    },
    nameStyle: {
        fontSize: 20,
        fontWeight: '600'
    }
})

export default UserComponentForList