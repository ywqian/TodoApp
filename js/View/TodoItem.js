/**
 * Created by ywq on 2017/1/10.
 * 描述：
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class TodoItem extends Component {

    static get defaultProps() {
        return {
            data: {},
            deleteItem: undefined,
            changeItem: undefined,
        }
    }

    static propTypes = {
        data: React.PropTypes.object.isRequired,
        deleteItem: React.PropTypes.func,
        changeItem: React.PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            complete: props.data.complete,

            // 测试方式二：在item中定义一个新的变量，赋值为传递过来的数据，但是这种可能和原始一样，newData仍然指向的是props.data
            newData: props.data
        };
    }

    componentWillReceiveProps(newProps) {

        console.log("TodoItem+componentWillReceiveProps------");
        console.log(newProps);

        this.state = {
            complete: newProps.data.complete,
            newData: newProps.data
        }
    }

    render() {
        console.log("todoItem+renderRow:" + JSON.stringify(this.props.data));

        const {
            data,
            deleteItem
        } = this.props;

        const {
            newData
        } = this.state;

        // return (
        //     <View style={styles.todoItemStyle}>
        //         <Text>{data.id}</Text>
        //         <Text>{data.title}</Text>
        //         <Text>{this.state.complete ? "完成" : "未完成"}</Text>
        //         <TouchableOpacity activeOpacity={0.7} style={styles.todoItemDelStyle} onPress={()=>{deleteItem(data.id)}}>
        //             <Text>X</Text>
        //         </TouchableOpacity>
        //
        //         <TouchableOpacity activeOpacity={0.7} style={styles.changeStyle} onPress={this.change.bind(this)}>
        //             <Text>点击改变complete的值</Text>
        //         </TouchableOpacity>
        //     </View>
        // )

        return (
            <View style={styles.todoItemStyle}>
                <Text>{newData.id}</Text>
                <Text>{newData.title}</Text>
                <Text>{this.state.complete ? "完成" : "未完成"}</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.todoItemDelStyle} onPress={()=>{deleteItem(newData.id)}}>
                    <Text>X</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} style={styles.changeStyle} onPress={this.change.bind(this)}>
                    <Text>点击改变complete的值</Text>
                </TouchableOpacity>
            </View>
        )
    }

    change() {
        this.state.complete = !this.state.complete;

        // 测试1：去掉这行代码，因为complete: props.data.complete，看是否通过改变了this.state.complete值能否改变列表中原始数据的值；
        // ----->原始数据未改变，说明传递的不是引用
        // this.props.data.complete = this.state.complete;

        // 对应测试二：
        // this.state.newData.complete = this.state.complete;

        this.setState({
            complete: this.state.complete,
            // newData: this.state.newData
        });

        // 测试方式三：写一个回调，当我改变item中的值的时候，回调到首页去改变list中rowData的值
        // 对应测试三，现在的值和原来的值不一样了才去回调
        if (this.state.complete != this.state.newData.complete) {
            this.props.changeItem && this.props.changeItem();
        }
    }
}

const styles = StyleSheet.create({
    todoItemStyle: {
        height: 80,
        flexDirection: 'row',
        backgroundColor: 'yellow'
    },
    todoItemDelStyle: {
        width: 48,
        height: 48,
        borderWidth: 1,
        alignItems: 'center'
    },
    changeStyle:{
        width: 150,
        height: 48,
        backgroundColor: 'blue',
    }
});