import * as React from 'react'
import {
    FlatList,
    ListRenderItem,
    ListRenderItemInfo,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native'
import {MAIN_PADDING, MAIN_WHITE, MessagesData, SECOND_WHITE} from "../../constatnts";
import {useEffect, useRef, useState} from "react";

interface UserMessagesProps {
    name: string
    messages: MessagesData[]
}

function UserMessagesPage(navigation: any) {
    const messagesData: UserMessagesProps = navigation.route.params

    const renderItem: ListRenderItem<MessagesData> = (itm: ListRenderItemInfo<MessagesData>) => {
        return (
            <View style={styles.messageContainer}>
                <Text>{itm.item.message}</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={"padding"}
                enabled keyboardVerticalOffset={90}
            >
                <SafeAreaView style={styles.mainContainer}>
                    <View style={{...styles.mainContainer, paddingHorizontal: MAIN_PADDING}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigation.replace('Root')}
                        >

                            <Text>{messagesData.name}</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={messagesData.messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            inverted contentContainerStyle={{flexDirection: 'column-reverse'}}
                        />
                    </View>

                </SafeAreaView>
                <SafeAreaView style={{width: '100%', backgroundColor: SECOND_WHITE}}>
                    <View
                        style={styles.textInputContainer}
                    >
                        <TextInput
                            style={{...styles.textInput,}}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                        <View style={{width: 10}}/>
                        <TouchableOpacity
                            style={styles.sendBtn}
                        >

                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
    },
    keyboardAvoiding: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    messageContainer: {
        padding: 7,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: SECOND_WHITE
    },
    textInputContainer: {
        // height: 60,
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#F0F0F0'
    },
    sendBtn: {
        height: 40,
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: 'grey'
    }
})

export default UserMessagesPage