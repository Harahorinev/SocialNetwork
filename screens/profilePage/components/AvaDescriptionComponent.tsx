import * as React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import {MAIN_PADDING, MAIN_WHITE, SECOND_WHITE} from '../../../constatnts'
import {useState} from "react";

interface Props {
    ava: HTMLImageElement
    description: string
    addPost: (postText: string) => {}
}

function AvaDescriptionComponent(props: Props) {
    const [postText, setPostText] = useState<string>('')
    return (
        <View style={styles.lowContainer}>
            <TouchableWithoutFeedback>
                <View style={styles.highContainer}>
                    <View style={styles.avaDescriptionContainer}>
                        <Image
                            style={styles.ava}
                            source={props.ava}
                        />
                        <View style={{flex: 1}}/>
                        <View style={styles.description}>
                            <Text>{props.description}</Text>
                        </View>
                    </View>
                    <View style={styles.newPostContainer}>
                        <View style={styles.textNewPostContainer}>
                            <TextInput
                                style={styles.textInput}
                                multiline={true}
                                value={postText}
                                onChangeText={(text) => setPostText(text)}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.addNewPostBtn}
                            disabled={!postText}
                            onPress={() => {
                                props.addPost(postText)
                                setPostText('')
                            }}
                        >
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    highContainer: {
        height: 200,
        width: '100%',
        paddingHorizontal: MAIN_PADDING,
        borderBottomEndRadius: 60,
        backgroundColor: MAIN_WHITE
    },
    lowContainer: {
        height: 200,
        width: '100%',
        backgroundColor: SECOND_WHITE
    },
    avaDescriptionContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ava: {
        flex: 3,
        aspectRatio: 1,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    description: {
        flex: 15,
    },
    newPostContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 10,
    },
    textNewPostContainer: {
        flex: 1,
        height: '100%',
        borderWidth: 3,
        borderRadius: 7,
        borderColor: SECOND_WHITE,
        backgroundColor: MAIN_WHITE,
        justifyContent: 'flex-start',

    },
    textInput: {
        flex: 1,
        textAlign: 'left',
        justifySelf: 'flex-start'
    },
    addNewPostBtn: {
        alignSelf: 'center',
        marginHorizontal: 7,
        padding: 7,
        borderRadius: 5,
        backgroundColor: SECOND_WHITE
    }
})

export default AvaDescriptionComponent