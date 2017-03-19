/**
 * Created by ywq on 2017/1/6.
 * 描述：
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

export default class TodoInput extends Component {

    static get defaultProps() {
        return {
            createItem: undefined
        }
    }

    static propTypes = {
        createItem: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
          title: ""
        };
    }

    render() {
        return (
            <View>
                <TextInput
                    ref = "textInput"
                    {...this.props}
                    placeholder="请输入您的未代办事项..."
                    style={styles.todoInputStyle}
                    underlineColorAndroid="transparent"
                    onChangeText={this.changeText.bind(this)}
                    onBlur={this.createItem.bind(this)}
                    value={this.state.title}
                />
            </View>
        );
    }

    changeText(text) {
        this.setState({
            title: text
        });
    }

    /**
     * create TodoItem
     */
    createItem() {
        if (this.state.title) {
            this.props.createItem && this.props.createItem(this.state.title);

            this.setState({
                title: ""
            });
        }
    }
}

const styles = StyleSheet.create({
    todoInputStyle: {
        width: 300,
        borderWidth: 1,
        borderColor: '#e7e7e7',
        borderRadius: 10,
        margin: 10
    }
});