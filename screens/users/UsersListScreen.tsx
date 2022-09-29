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
import {MAIN_PADDING, MAIN_WHITE} from "../../constatnts";
import {connect} from "react-redux";
import {followUnfollow, getUsers, isFetching, UsersRT, UserT} from "../../redux/allUsersR";
import UserComponentForList from "./components/UserComponentForList";
import {AllStateType} from "../../redux/store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {DrawerParamList, RootStackParamList} from "../../types";
import {RouteProp} from "@react-navigation/native";

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType

type MapStatePropsType = {
    users: UsersRT
}

type MapDispatchPropsType = {
    isFetching: (status: boolean) => {}
    getUsers: (fetching: boolean, page: number) => void
    followUnfollow: (userId: number, userFollowed: boolean) => void
}

type OwnPropsType = {
    navigation: NativeStackNavigationProp<RootStackParamList>
    route: RouteProp<DrawerParamList, 'Users'>
}

const UsersListScreen = (props: Props) => {
    useEffect(() => {
        props.getUsers(props.users.fetching, props.users.page)
    }, [props.users.fetching])

    const renderItem: ListRenderItem<UserT> = (itm: ListRenderItemInfo<UserT>) => {
        return (
            <UserComponentForList navigation={() => props.navigation.navigate('User', {id: itm.item.id})}
                                  name={itm.item.name}
                                  photos={itm.item.photos}
                                  id={itm.item.id}
                                  followed={itm.item.followed}
                                  followUnfollow={props.followUnfollow}
                                  followingInProgress={props.users.followingInProgress}
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

const mapStateToProps = (state: AllStateType): MapStatePropsType => {
    return {
        users: state.usersPage
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType,
    OwnPropsType, AllStateType>(mapStateToProps, {isFetching, getUsers, followUnfollow})(UsersListScreen)