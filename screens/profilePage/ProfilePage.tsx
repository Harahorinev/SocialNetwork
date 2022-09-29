import * as React from "react";
import {StyleSheet} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {SECOND_WHITE} from "../../constatnts";
import AvaDescriptionComponent from "./components/AvaDescriptionComponent";
import PostsContainer from "./components/PostsContainer";
import {connect} from "react-redux";
import {addPostAC, ProfileStateT} from "../../redux/userPostsR";
import {AllStateType} from "../../redux/store";
import {AuthStateT} from "../../redux/authR";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {DrawerParamList} from "../../types";
import {RouteProp} from "@react-navigation/native";

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType
type MapStatePropsType = {
    profilePage: ProfileStateT,
    userInfo: AuthStateT
}
type MapDispatchPropsType = {
    addPost: (postText: string) => {}
}
type OwnPropsType = {
    navigation: NativeStackNavigationProp<DrawerParamList>
    route: RouteProp<DrawerParamList, 'Profile'>
}

const ProfilePage = (props: Props) => {
    return (
        <ScrollView style={styles.container}>
            <AvaDescriptionComponent
                login={props.userInfo.login ? props.userInfo.login : ''}
                ava={props.profilePage.ava}
                description={props.profilePage.description}
                addPost={props.addPost}
            />
            <PostsContainer posts={props.profilePage.posts}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: SECOND_WHITE
    },
})

const mapStateToProps = (state: AllStateType): MapStatePropsType => {
    return {
        profilePage: state.profilePage,
        userInfo: state.auth
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType,
    OwnPropsType, AllStateType>(mapStateToProps, {addPost: addPostAC})(ProfilePage);