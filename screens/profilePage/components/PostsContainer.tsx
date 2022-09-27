import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { MAIN_PADDING, MAIN_WHITE, SECOND_WHITE } from '../../../constatnts'
import {PostType} from "../../../redux/profileReducer";
import Post from "./PostComponent";

function PostsContainer({posts}: {posts: PostType[]}) {
    return (
        <View style={styles.lowPostsContainer}>
            <View style={styles.highPostsContainer}>
                {posts.slice().reverse().map((post) => {
                    return <Post key={post.id} postText={post.postText} postLikes={post.likesCounter}/>
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lowPostsContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: MAIN_WHITE,
    },
    highPostsContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: MAIN_PADDING,
        paddingVertical: 30,
        borderTopLeftRadius: 60,
        backgroundColor: SECOND_WHITE
    }
})

export default PostsContainer