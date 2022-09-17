import * as React from 'react'
import {
    FlatList,
    Image,
    ListRenderItem,
    ListRenderItemInfo,
    StyleSheet,
    View
} from "react-native";
import {useEffect} from "react";
import {MAIN_PADDING, MAIN_WHITE, REQUEST_QUANTITY_USERS} from "../../constatnts";
import {connect} from "react-redux";
import {addUsers, fetchNextPage, followStatusChanger, isFetching} from "../../redux/allUsersReducer";
import UserComponentForList from "./components/UserComponentForList";
import {usersAPI} from "../../api/api";

const UsersListScreen = (props: any) => {
    useEffect(() => {
        if (props.users.fetching) {
            usersAPI.getUsers(props.users.page).then((data: any) => {
                    if (Math.ceil(data.totalCount / REQUEST_QUANTITY_USERS) >= props.users.page) {
                        props.fetchNextPage(props.users.page + 1)
                        props.addUsers(data.items)
                    }
                    props.isFetching(false)
                })
        }
    }, [props.users.fetching])

    const renderItem: ListRenderItem<any> = (itm: ListRenderItemInfo<any>) => {
        return (
            <UserComponentForList navigation={() => props.navigation.navigate('User', {id: itm.item.id})}
                                  name={itm.item.name}
                                  photos={itm.item.photos}
                                  followStatusChanger={props.followStatusChanger}
                                  id={itm.item.id}
                                  followed={itm.item.followed}
            />
        )
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={props.users.users}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                onEndReached={() => props.isFetching(true)}
                onEndReachedThreshold={0.5}
                scrollEnabled={!props.users.fetching}
            />
            {props.users.fetching
                ? <View style={{width: '100%', alignItems: 'center', backgroundColor: MAIN_WHITE}}>
                    <Image style={{height: 100, width: 100, resizeMode: 'contain'}}
                           source={require('../../assets/images/preLoader.gif')}
                    />
                </View>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        padding: MAIN_PADDING,
        backgroundColor: MAIN_WHITE
    },
})

const mapStateToProps = (state: any) => {
    return {
        users: state.usersPage
    }
}

export default connect(mapStateToProps, {addUsers, isFetching, fetchNextPage, followStatusChanger})(UsersListScreen)