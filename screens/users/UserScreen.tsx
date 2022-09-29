import * as React from 'react'
import {StyleSheet, Text, View, SafeAreaView} from "react-native";
import {MAIN_WHITE} from "../../constatnts";
import MessagesTopBarComponent from "../userMessagesPage/components/MessagesTopBarComponent";
import {useEffect, useState} from "react";
import {profileAPI} from "../../api/api";
import {connect} from "react-redux";
import {AllStateType} from "../../redux/store";
import AvaDescriptionComponent from "../profilePage/components/AvaDescriptionComponent";
import PostsContainer from "../profilePage/components/PostsContainer";
import {ProfileStateT} from "../../redux/userPostsR";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../types";
import {RouteProp} from "@react-navigation/native";

type Props = StateProps & DispatchProps & OwnProps

type StateProps = {
    profile: ProfileStateT
}

type DispatchProps = {}

type OwnProps = {
    navigation: NativeStackNavigationProp<RootStackParamList>
    route: RouteProp<RootStackParamList, 'User'>
}

// 25708

const UserScreen = (props: Props) => {
    const [userName, setUserName] = useState<string>('')
    useEffect(() => {
        // profileAPI.getProfile(25708).then((data) => {
        profileAPI.getProfile(props.route.params.id).then((data) => {
            if (data) {
                setUserName(data.fullName)
            }
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <MessagesTopBarComponent name={'Profile'}
                                     navigation={() => props.navigation.replace('Root', {initialRouteName: 'Users'})}/>
            <View>
                <Text>{userName ? userName : ''}</Text>
            </View>
            <AvaDescriptionComponent
                ava={props.profile.ava}
                description={props.profile.description}
                addPost={null}
                login={'props.profile'}
            />
            <PostsContainer posts={props.profile.posts}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: MAIN_WHITE
    },
})

const mapStateToProps = (state: AllStateType) => {
    return {
        profile: state.profilePage
    }
}

export default connect<StateProps, DispatchProps,
    OwnProps, AllStateType>(mapStateToProps, {})(UserScreen)