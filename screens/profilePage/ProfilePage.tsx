import * as React from "react";
import {StyleSheet} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {SECOND_WHITE} from "../../constatnts";
import AvaDescriptionComponent from "./components/AvaDescriptionComponent";
import PostsContainer from "./components/PostsContainer";
import {connect} from "react-redux";
import {addPost, ProfileState} from "../../redux/profileReducer";
import {AllStateType} from "../../redux/store";
import {AuthStateType} from "../../redux/authReducer";

type Props = MapStatePropsType & MapDispatchPropsType & OwnPropsType & AllStateType
type MapStatePropsType = {
    profilePage: ProfileState,
    userInfo: AuthStateType
}
type MapDispatchPropsType = {
    addPost: (postText: string) => {}
}
type OwnPropsType = {
    navigation: any
}

function ProfilePage(props: Props) {
    return (
        <ScrollView style={styles.container}>
            <AvaDescriptionComponent
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
    OwnPropsType, AllStateType>(mapStateToProps, {addPost})(ProfilePage);