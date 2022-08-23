import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {MAIN_PADDING, MAIN_WHITE, SECOND_WHITE} from "../../constatnts";
import AvaDescriptionComponent from "./components/AvaDescriptionComponent";
import PostsContainer from "./components/PostsContainer";

function ProfilePage () {
    return (
        <ScrollView style={styles.container}>
            <AvaDescriptionComponent/>
            <PostsContainer/>
        </ScrollView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: SECOND_WHITE
    },
})

export default ProfilePage