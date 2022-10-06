import {InferActionsTypes} from "./store";

const userPostsS: ProfileST = {
    ava: require('../assets/images/ava.jpeg'),
    description: 'Description',
    posts: [
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
    ],
}

export const actions = {
    addPostAC: (newPostContent: string) => (
        {
            type: 'ADD_POST',
            newPostContent: newPostContent
        }
    ),
}

const userPostsR = (state = userPostsS, action: UserPostRAT) => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost: PostT = {
                id: state.posts[state.posts.length - 1].id + 1,
                postText: action.newPostContent,
                likesCounter: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        default:
            return state
    }
}

export default userPostsR


type UserPostRAT = InferActionsTypes<typeof actions>
export type ProfileST = {
    ava: HTMLImageElement
    description: string
    posts: PostT[]
}
export type PostT = {
    id: number
    postText: string
    likesCounter: number
}
