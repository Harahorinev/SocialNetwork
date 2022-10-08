import * as React from 'react'
import {StyleSheet, View, SafeAreaView, Image} from "react-native";
import {MAIN_WHITE} from "../../constatnts";
import {useEffect, useState} from "react";
import {profileAPI} from "../../api/api";
import {connect} from "react-redux";
import {AllStateType} from "../../redux/store";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../types";
import {RouteProp} from "@react-navigation/native";
import UserDescriptionComponent from "./components/UserDescriptionComponent";
import PostsContainer from "../profilePage/components/PostsContainer";
import {ProfileST} from "../../redux/userPostsR";

type Props = StateProps & DispatchProps & OwnProps

type StateProps = {
    profile: ProfileST
}

type DispatchProps = {}

type OwnProps = {
    navigation: NativeStackNavigationProp<RootStackParamList>
    route: RouteProp<RootStackParamList, 'User'>
}

// 25708

type LocalState = {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    },
    fullName: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    photos: { "large": any, "small": any }
    userId: number | null
}

const UserScreen = (props: Props) => {
    const [profileState, setProfileState] = useState<LocalState | null>(null)
    const [wasLoad, setWasLoad] = useState<boolean>(false)

    useEffect(() => {
        profileAPI.getProfile(props.route.params.id).then((data) => {
            if (data) {
                setProfileState(data)
                // @ts-ignore
                props.navigation.setOptions({title: data.fullName})
                setWasLoad(true)
            }
        })
    }, [])

    if (!wasLoad) {
        return <Image style={{height: 150, width: 150}} source={require('../../assets/images/preLoader.gif')}/>
    }

    return (
        <SafeAreaView style={styles.container}>
            {profileState && profileState.userId
                ? <View style={{flex: 1, width: '100%', backgroundColor: 'red'}}>
                    <UserDescriptionComponent
                        addPost={null}
                        ava={profileState.photos.large}
                        aboutMe={profileState.aboutMe}
                        login={profileState.fullName}
                    />
                    <PostsContainer posts={props.profile.posts}/>
                </View>
                : <Image style={{height: 150, width: 150}} source={require('../../assets/images/preLoader.gif')}/>
            }
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

const mapStateToProps = (state: AllStateType): StateProps => {
    return {
        profile: state.profilePage
    }
}

export default connect<StateProps, DispatchProps,
    OwnProps, AllStateType>(mapStateToProps, {})(UserScreen)
