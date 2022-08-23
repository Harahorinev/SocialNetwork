import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MAIN_PADDING, MAIN_WHITE, SECOND_WHITE } from '../../../constatnts'
import Post from './PostComponent'

interface PostsData {
    id: number
    postText: string
    likesCounter: number
}

function PostsContainer() {
    let postsData: PostsData[] = [
        {
            id: 1,
            postText: 'qweqwe1',
            likesCounter: 2
        },
        {
            id: 2,
            postText: 'qweqwe2',
            likesCounter: 7
        },
        {
            id: 3,
            postText: 'qweqwe3',
            likesCounter: 23,
        }
    ]
    return (
        <View style={styles.lowPostsContainer}>
            <View style={styles.highPostsContainer}>
                {postsData.map(post => {
                    return <Post key={post.id} postText={post.postText}/>
                })}
                {/*<Post postText='qweqwe1'/>*/}
                {/*<Post postText='qweqwe2'/>*/}
                {/*<Post postText='qweqwe3'/>*/}
                {/*<Post postText='qweqwe4'/>*/}
                {/*<Post postText='qweqwe5'/>*/}
                {/*<Post postText='qweqwe6'/>*/}
                {/*<Post postText='qweqwe7'/>*/}
                {/*<Post postText='qweqwe8'/>*/}

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