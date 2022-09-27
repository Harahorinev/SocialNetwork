const ADD_POST = 'ADD_POST'

export interface ProfileState {
    ava: HTMLImageElement
    description: string
    posts: PostType[]
}

export type PostType = {
    id: number
    postText: string
    likesCounter: number
}

interface Action {
    type: string
    newPostContent: string
}

const INITIAL_STATE: ProfileState = {
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

export const addPost = (newPostContent: string) => (
    {
        type: ADD_POST,
        newPostContent: newPostContent
    }
);

const profileReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost: PostType = {
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

export default profileReducer