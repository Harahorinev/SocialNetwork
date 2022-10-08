import * as React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import ProfilePage from "./screens/profilePage/ProfilePage";
import NewsPage from "./screens/NewsPage";
import MusicPage from "./screens/MusicPage";
import DialogsPage from "./screens/dialogsPage/DialogsPage";
import UserMessagesPage from "./screens/userMessagesPage/UserMessagesPage";
import {createStackNavigator} from "@react-navigation/stack";
import {DrawerParamList, RootStackParamList} from "./types";
import UsersPage from "./screens/users/UsersListScreen";
import UserScreen from "./screens/users/UserScreen";
import LoginScreen from "./screens/LoginScreen";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RouteProp} from "@react-navigation/native";

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

enum InitialRouteName {
    Profile = 'Profile',
    Dialogs = 'Dialogs',
    Users = 'Users'
}

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList>
    route: RouteProp<RootStackParamList, 'Root'>
}

const DrawerNavigator = (props: Props) => {
    let initialRouteName: InitialRouteName = props.route.params && props.route.params.initialRouteName
        ? InitialRouteName[props.route.params.initialRouteName as keyof typeof InitialRouteName]
        : InitialRouteName.Profile
    return (
        <Drawer.Navigator initialRouteName={initialRouteName}>
            <Drawer.Screen name="Profile" component={ProfilePage} options={{headerShown: true}}/>
            <Drawer.Screen name="Dialogs" component={DialogsPage} options={{headerShown: true}}/>
            <Drawer.Screen name="Users" component={UsersPage} options={{headerShown: true}}/>
            <Drawer.Screen name="News" component={NewsPage} options={{headerShown: true}}/>
            <Drawer.Screen name="Music" component={MusicPage} options={{headerShown: true}}/>
        </Drawer.Navigator>
    )
}

const StackNavigator = (props: any) => {
    console.log('props', props)
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Root" component={DrawerNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="Messages" component={UserMessagesPage}
                          options={{headerShown: true, headerBackTitle: ''}}/>
            <Stack.Screen name="User" component={UserScreen}
                          options={{headerShown: true, headerBackTitle: ''}}/>
        </Stack.Navigator>
    )
}

export default StackNavigator
