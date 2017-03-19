/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    Navigator
} from 'react-native';
import App from './js/View/App';

export default class TodoApp extends Component {
  render() {
    return (
        <Navigator
            initialRoute={{name:'TodoApp', component:App}}
            configureScene={() => ({
                 ...Navigator.SceneConfigs.PushFromRight,//转场动画
                gestures: { pop: false }
            })}
            renderScene={(route, natigator) => {
              let Component = route.component;
              return <Component {...route.params} navigator={natigator} />
            }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
