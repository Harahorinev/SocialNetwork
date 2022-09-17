import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import React from 'react';
import StackNavigator from './navigation';
import {NavigationContainer} from "@react-navigation/native";
import store from "./redux/store";

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
