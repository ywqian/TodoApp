/**
 * Created by ywq on 2017/1/6.
 * 描述：
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class TodoHeader extends Component {

    static get defaultProps() {
        return {
            name: "呵呵",
            todoCount: 99
        }
    }

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        todoCount: React.PropTypes.number.isRequired
    };

    render() {

        const {
            name,
            todoCount
        } = this.props;

        return (
            <View style={styles.container}>
                <Text>我的备忘事项</Text>
                <Text>hello, {name}，您有{todoCount}项未代办事情未处理</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{

    }
});