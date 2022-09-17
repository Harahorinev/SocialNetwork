import * as React from "react";
import {StyleSheet} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {SECOND_WHITE} from "../../constatnts";
import AvaDescriptionComponent from "./components/AvaDescriptionComponent";
import PostsContainer from "./components/PostsContainer";
import {connect} from "react-redux";
import {addPost} from "../../redux/profileReducer";

function ProfilePage(props: any) {
    return (
        <ScrollView style={styles.container}>
            <AvaDescriptionComponent
                ava={props.profilePage.ava}
                description={props.profilePage.description}
                addPost={props.profilePage.createPost}
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

const mapStateToProps = (state: any) => {
    return {
        profilePage: state.profilePage,
        userInfo: state.auth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    // TODO add type
    return {
        createPost: (postText: string) => dispatch(addPost(postText))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);