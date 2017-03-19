/**
 * Created by ywq on 2017/1/6.
 * 描述：
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    BackAndroid,
    ToastAndroid
} from 'react-native';
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
const TodosJson = require('../todos.json');

// import TodoAction from '../Action/TodoAction';
// import TodoStore from '../Store/TodoStore';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: [] /*TodoStore.getTodos()*/
        }
    }

    render() {

        const {
            todos
        } = this.state;

        let todoCount = todos.filter((item) => item.complete === false).length;

        return (
            <View>
                <TodoHeader name={"老俞"} todoCount={todoCount}/>
                <TodoInput createItem={this.createItem.bind(this)}/>
                <TodoList
                    todos={todos}
                    deleteItem={this.deleteItem.bind(this)}
                    clickItem={this.pushToDetail.bind(this)}/>
            </View>
        );
    }

    /**
     * 创建代办事项：id最后一项递增
     * @param title
     */
    createItem(title) {
        const {
            todos
        } = this.state;

        let newID = todos.length === 0 ? 101 : todos[todos.length - 1].id + 1;

        todos.push({
            id: newID,
            complete: false,
            title: title
        });

        this.setState({
            todos
        });
    }

    /**
     * 根据id删除代办事项
     * @param id
     */
    deleteItem(id) {
        console.log("删除item=" + id);
        const {
            todos
        } = this.state;

        let index = todos.findIndex((item)=>{
            return item.id === id;
        });

        let dele = todos.splice(index, 1);
        console.log(dele);

        this.setState({
            todos: this.state.todos
        });
        console.log(this.state.todos);
    }

    /**
     * 改变事项属性：complete
     * @param data
     */
    changeItem(data) {
        const {
            todos
        } = this.state;

        let index = todos.findIndex((item)=>{
            return item.id === data.id;
        });
        console.log(index);

        // todo.complete = true;
        // todo.title = "eeeeeeee";

        todos.splice(index, 1, {
            id: data.id,
            complete: !data.complete,
            title: data.title
        });

        this.setState({
            todos
        });
    }

    /**
     * 跳转到详情页
     * @param rowData
     */
    pushToDetail(rowData) {
        console.log("pushToDetail");

        let self = this;
        let {navigator} = this.props;
        if (navigator) {
            navigator.push({
                title: '详情',
                component: TodoDetail,
                params: {
                    data: rowData,
                    changeItem(data) {
                        console.log("App回调啦");
                        self.changeItem(data);
                    }
                }
            });
        }
    }

    componentDidMount() {
        // 事件的监听
        // this.listenerMethod = TodoStore.addObserver(()=>{
        //     this.state = {
        //         todos: TodoStore.getTodos()
        //     }
        // });

        // 读取本地数据
        // TodoAction.loadData();

        this.setState({
            todos: TodosJson
        });
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    componentWillUnMount() {
        if (Platform.OS === 'android') { // 不做这个判断也可以
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
        // this.listenerMethod();
    }

    // android物理返回键退出
    onBackAndroid() {
        const {navigator} = this.props;
        const routes = navigator.getCurrentRoutes();
        if (routes.length > 1) {
            navigator.pop();
            return true;
        } else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        } else {
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次返回键退出应用', ToastAndroid.SHORT);
            return true;
        }
    }
}