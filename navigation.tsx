import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import ProfilePage from "./screens/profilePage/ProfilePage";
import NewsPage from "./screens/NewsPage";
import MusicPage from "./screens/MusicPage";
import DialogsPage from "./screens/dialogsPage/DialogsPage";
import UserMessagesPage from "./screens/userMessagesPage/UserMessagesPage";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function DrawerNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Profile">
                <Drawer.Screen name="Profile" component={ProfilePage} options={{ headerShown: true }} />
                <Drawer.Screen name="Dialogs" component={StackNavigator} options={{ headerShown: true }} />
                <Drawer.Screen name="News" component={NewsPage} options={{ headerShown: true }} />
                <Drawer.Screen name="Music" component={MusicPage} options={{ headerShown: true }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

function StackNavigator() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Root" component={DialogsPage} options={{ headerShown: false }} />
            <Stack.Screen name="Messages" component={UserMessagesPage} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Messages" component={UserMessagesPage} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    )
}

export default DrawerNavigator