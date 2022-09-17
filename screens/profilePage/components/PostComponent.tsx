import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

interface PostProps {
    postText: string
    postLikes: number
}

function Post (props: PostProps) {
    return (
        <View style={styles.container}>
            <Text>{props.postText}</Text>
            <View style={{flex: 1}}/>
            <Text>{props.postLikes}</Text>
            <View style={{width: 5}}/>
            <AntDesign name={'hearto'} size={20}/>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
})

export default Post