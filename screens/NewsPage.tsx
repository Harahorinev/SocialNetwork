import * as React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { MAIN_PADDING, MAIN_WHITE } from '../constatnts'

const NewsPage = ({navigation}: {navigation: any}) => {
    console.log()
    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
            <Text>News</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: MAIN_PADDING,
        backgroundColor: MAIN_WHITE
    }
})

export default NewsPage