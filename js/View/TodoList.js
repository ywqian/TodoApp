/**
 * Created by ywq on 2017/1/6.
 * 描述：
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';
import TodoItem from './TodoItem';

export default class TodoList extends Component {

    static get defaultProps() {
        return {
            todos: [],
            deleteItem: undefined,
            clickItem: undefined
        }
    }

    static propTypes = {
        todos: React.PropTypes.array.isRequired,
        deleteItem: React.PropTypes.func.isRequired,
        clickItem: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2)=> {
                if (r1 !== r2) {
                    console.log("不相等=");
                    console.log(r1);
                    console.log(r2);
                } else {
                    console.log("相等=");
                    console.log(r1);
                    console.log(r2);
                }
                return r1 !== r2;
            }
        });

        // 对应第三种
        // this.datas = props.todos;

        // 对应第五种
        // this.datas = props.todos.slice(0);

        // 第六种
        this.datas = [...props.todos];

        this.state = {
            // 第一种方式，直接用传递过来的todos，对应dataSource={this.state.dataSource}
            // ---->不可行，这种方式会造成改变todos，但是renderRow不会被调用，rowHasChanged打印的    r1!==r2   返回false
            // dataSource: ds.cloneWithRows(props.todos),

            // 第三种：对应dataSource={this.state.dataSource}
            //--->不可行，和第一种方式一样，renderRow不会被调用，rowHasChanged打印的    r1!==r2   返回false
            // dataSource: ds.cloneWithRows(this.datas),


            // 第二种：用一个state变量保存传递过来的值，对应dataSource={this.state.dataSource.cloneWithRows(this.state.datas)}
            // ----->可行，但是renderRow每次都会被全部调用，rowHasChanged不会再被打印
            // datas: props.todos,
            // dataSource: ds

            // 第四种：复制值到新的state变量中，对应dataSource={this.state.dataSource.cloneWithRows(this.state.datas)}
            // ---->可行，和第二种方式一样，renderRow每次都会被全部调用，rowHasChanged不会再被打印
            // datas: props.todos.slice(0),
            // dataSource: ds


            // 第五种：对应dataSource={this.state.dataSource}
            // ---->可行，rowHasChanged会准确比较r1和r2,打印的    r1!==r2   返回true/false
            dataSource: ds.cloneWithRows(this.datas),

            // 总结：1、不能直接用props传递过来的值，会造成r1!==r2判断错误；
            //      2、定义一个新的变量赋值为props传递过来的值(=)，若setState新定义的datas，那么每次都会被全部调用；
            //      3、定义一个新的变量赋值为props传递过来的内容值，若setState定义的dataSource，renderRow会被准确调用；（第五种情况）
        }
    }

    componentWillReceiveProps(newProps) {

        console.log("-------------todoList+componentWillReceiveProps-------------");
        console.log(newProps);

        // 对应第三种
        // this.datas = newProps.todos;

        // 对应第五种
        // this.datas = newProps.todos.slice(0);

        this.datas = [...newProps.todos];

        this.setState({
            // 对应第一种方式
            // dataSource: this.state.dataSource.cloneWithRows(newProps.todos),

            // 对应第二种方式
            // datas: newProps.todos

            // 对应第三种方式
            // dataSource: this.state.dataSource.cloneWithRows(this.datas),

            // 对应第四种方式
            // datas: newProps.todos.slice(0),

            // 对应第五种方式
            dataSource: this.state.dataSource.cloneWithRows(this.datas),
        });
    }

    render() {
        console.log("todoList+render");

        return (
            <View>
                <ListView
                    contentContainerStyle={styles.todoListStyle}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections={true}
                    removeClippedSubviews={false}
                />
            </View>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        console.log("todoList+renderRow:" + rowID);
        return (
            <TouchableOpacity onPress={()=>{this.props.clickItem(rowData);}}>
                <TodoItem
                    data={rowData}
                    deleteItem={this.deleteItem.bind(this)}/>
            </TouchableOpacity>
        )
    }

    deleteItem(id) {
        this.props.deleteItem(id);
    }

    changeItem(newData) {
        console.log("回调数据啦");
        newData.complete = !newData.complete;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.datas),
        });
    }
}

const styles = StyleSheet.create({
    todoListStyle: {
        backgroundColor: 'white'
    },
});