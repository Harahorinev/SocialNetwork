import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface PostProps {
    postText: string
}

function Post (props: PostProps) {
    return (
        <View style={styles.container}>
            <Text>{props.postText}</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    }
})

export default Post