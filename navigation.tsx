import * as React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ProfilePage from "./screens/profilePage/ProfilePage";
import NewsPage from "./screens/NewsPage";
import MusicPage from "./screens/MusicPage";
import DialogsPage from "./screens/dialogsPage/DialogsPage";
import UserMessagesPage from "./screens/userMessagesPage/UserMessagesPage";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "./types";
import UsersPage from "./screens/users/UsersListScreen";
import UserScreen from "./screens/users/UserScreen";
import LoginScreen from "./screens/LoginScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function DrawerNavigator(initialParams: any) {
    return (
        <Drawer.Navigator initialRouteName={initialParams.initialRouteName}>
            <Drawer.Screen name="Profile" component={ProfilePage} options={{headerShown: true}}/>
            <Drawer.Screen name="Dialogs" component={DialogsPage} options={{headerShown: true}}/>
            <Drawer.Screen name="Users" component={UsersPage} options={{headerShown: true}}/>
            <Drawer.Screen name="News" component={NewsPage} options={{headerShown: true}}/>
            <Drawer.Screen name="Music" component={MusicPage} options={{headerShown: true}}/>
        </Drawer.Navigator>
    )
}

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Root" component={DrawerNew} options={{headerShown: false}}/>
            <Stack.Screen name="Messages" component={UserMessagesPage} options={{headerShown: false}}/>
            <Stack.Screen name="User" component={UserScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

const DrawerNew = (props: any) => {
    let initialRouteName = props.route.params && props.route.params.initialRouteName ? props.route.params.initialRouteName : 'Profile'
    return (
        <DrawerNavigator initialRouteName={initialRouteName} {...props} />
    )
}

export default StackNavigator