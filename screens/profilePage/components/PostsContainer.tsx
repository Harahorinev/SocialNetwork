import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { MAIN_PADDING, MAIN_WHITE, SECOND_WHITE } from '../../../constatnts'
import Post from './PostComponent'

interface PostData {
    id: number
    postText: string
    likesCounter: number
}

function PostsContainer(props: any) {
    return (
        <View style={styles.lowPostsContainer}>
            <View style={styles.highPostsContainer}>
                {props.posts.slice().reverse().map((post: PostData) => {
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