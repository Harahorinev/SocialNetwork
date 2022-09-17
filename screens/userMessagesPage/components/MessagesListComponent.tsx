import * as React from 'react'
import {FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View} from "react-native";
import {MAIN_PADDING, MessagesData, SECOND_WHITE} from "../../../constatnts";

interface Props {
    messages: MessagesData[]
}

const MessagesListComponent = (props: Props) => {
    const renderItem: ListRenderItem<MessagesData> = (itm: ListRenderItemInfo<MessagesData>) => {
        return (
            <View style={styles.messageContainer}>
                <Text>{itm.item.message}</Text>
            </View>
        )
    }


    return (
        <View style={styles.flatListContainer}>
            <FlatList
                data={props.messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                inverted contentContainerStyle={{flexDirection: 'column-reverse'}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: MAIN_PADDING,
    },
    messageContainer: {
        padding: 7,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: SECOND_WHITE
    }
})

export default MessagesListComponent