import * as React from 'react'
import {View, StyleSheet, FlatList, ListRenderItem, ListRenderItemInfo} from 'react-native'
import {MAIN_PADDING, MAIN_WHITE} from '../../constatnts'
import UserDialogComponent from './components/UserDialgListComponent'
import {connect} from "react-redux";
import {Dialog} from "../../redux/dialogsReducer";
import {AllStateType} from "../../redux/store";

type Props = MapStatePropsType & OwnPropsType
type MapStatePropsType = {
    dialogs: Dialog[]
}

type OwnPropsType = {
    navigation: any
}

function DialogsPage(props: Props) {
    const renderItem: ListRenderItem<Dialog> = (itm: ListRenderItemInfo<Dialog>) => {
        return (
            <UserDialogComponent
                key={itm.item.userId}
                name={itm.item.name}
                lastMessage={itm.item.messagesData[itm.item.messagesData.length - 1].message}
                messages={itm.item.messagesData}
                navigation={() => props.navigation.replace('Messages', {userId: itm.item.userId})}
            />
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={props.dialogs}
                renderItem={renderItem}
                keyExtractor={(item) => item.userId.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: MAIN_PADDING,
        paddingVertical: 10,
        backgroundColor: MAIN_WHITE
    }
})

const mapStateToProps = (state: AllStateType): MapStatePropsType => {
    return state.dialogsPage
}

export default connect<MapStatePropsType, null, OwnPropsType, AllStateType>(mapStateToProps)(DialogsPage)