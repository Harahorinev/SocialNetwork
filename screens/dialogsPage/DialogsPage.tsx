import * as React from 'react'
import {View, StyleSheet} from 'react-native'
import {MAIN_PADDING, MAIN_WHITE, MessagesData, UsersData} from '../../constatnts'
import UserDialogComponent from './components/UserDialgComponent'


function DialogsPage({navigation}: { navigation: any }) {
    let usersData: UsersData[] = [
        {
            id: 1,
            name: 'Anton',
            messagesData: [
                {
                    id: 1,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 2,
                    message: 'Kak dela'
                },
                {
                    id: 3,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 4,
                    message: 'Kak dela'
                },
                {
                    id: 5,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 6,
                    message: 'Kak dela'
                },
                {
                    id: 7,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 8,
                    message: 'Kak dela'
                },
                {
                    id: 9,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 10,
                    message: 'Kak dela'
                },
                {
                    id: 12,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 13,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 14,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 15,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 16,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 17,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 18,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet 18',
                },
                {
                    id: 19,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet 19',
                },
            ]
        },
        {
            id: 2,
            name: 'Masha',
            messagesData: [
                {
                    id: 1,
                    message: 'Privet!'
                },
                {
                    id: 2,
                    message: 'Ya tut!'
                }
            ]
        }
    ]
    return (
        <View style={styles.container}>
            {usersData.map(us => {
                return (
                    <UserDialogComponent
                        key={us.id}
                        name={us.name}
                        lastMessage={us.messagesData[us.messagesData.length - 1].message}
                        messages={us.messagesData}
                        navigation={() => navigation.replace('Messages', {name: us.name, messages: us.messagesData})}

                    />
                )
            })}
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

export default DialogsPage