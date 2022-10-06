import {InferActionsTypes} from "./store";

let dialogsState: DialogsST = {
    dialogs: [
        {
            userId: 1,
            name: 'Anton',
            messagesData: [
                {
                    id: 1,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 2,
                    message: 'Kak dela'
                },
                {
                    id: 3,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 4,
                    message: 'Kak dela'
                },
                {
                    id: 5,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 6,
                    message: 'Kak dela'
                },
                {
                    id: 7,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 8,
                    message: 'Kak dela'
                },
                {
                    id: 9,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 10,
                    message: 'Kak dela'
                },
                {
                    id: 11,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 12,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 13,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 14,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 15,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 16,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 17,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet',
                },
                {
                    id: 18,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet 18',
                },
                {
                    id: 19,
                    message: 'Privet Privet Privet Privet Privet Privet Privet Privet Privet Privet 19',
                },
            ]
        },
        {
            userId: 2,
            name: 'Masha',
            messagesData: [
                {
                    id: 1,
                    message: 'Privet!'
                },
                {
                    id: 2,
                    message: 'Ya tut!'
                }
            ]
        }
    ]
}

const dialogsR = (state: DialogsST = dialogsState, action: DialogsRAT) => {
    switch (action.type) {
        case 'ADD_NEW_MESSAGE': {
            let newDialogs = state.dialogs.map(d => {
                if (d.userId !== action.userId) {
                    return d
                } else {
                    let newMessage: Message = {
                        id: d.messagesData[d.messagesData.length - 1].id + 1,
                        message: action.newMessageContent
                    }
                    return {
                        ...d,
                        messagesData: [...d.messagesData, newMessage]
                    }
                }
            })
            return {
                ...state,
                dialogs: newDialogs
            }
        }
        default:
            return state
    }
}

export const actions = {
    addMessage: (userId: number, newMessageText: string) => (
        {
            type: 'ADD_NEW_MESSAGE',
            userId: userId,
            newMessageContent: newMessageText
        }
    ),
}

export default dialogsR


type DialogsRAT = InferActionsTypes<typeof actions>
export type DialogsST = {
    dialogs: Dialog[]
}
export type Dialog = {
    userId: number,
    name: string,
    messagesData: Message[]
}
export type Message = {
    id: number
    message: string
}
