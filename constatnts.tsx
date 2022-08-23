export const MAIN_WHITE = '#F6F6F6'
export const SECOND_WHITE = '#D7D7D7'
export const MAIN_PADDING = 20

export interface UsersData {
    id: number
    name: string
    messagesData: MessagesData[]
}

export interface MessagesData {
    id: number
    message: string
}