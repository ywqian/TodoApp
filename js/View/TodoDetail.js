/**
 * Created by ywq on 2017/1/9.
 * 描述：
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import TodoItem from './TodoItem';

export default class TodoDetail extends Component {

    static get defaultProps() {
        return {
            data: {},
            changeItem: undefined,
        }
    }

    static propTypes = {
        data: React.PropTypes.object.isRequired,
        changeItem: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    render() {
        console.log("详情页+render---------------data:" + JSON.stringify(this.props.data));

        const {
            data,
            changeItem
        } = this.props;

        return (
            <View style={styles.container}>

                <Text>详情页</Text>

                <TodoItem data={data} changeItem={()=>{changeItem(data)}}/>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {

    }
});