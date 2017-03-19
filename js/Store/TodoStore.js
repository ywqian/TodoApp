/**
 * Created by ywq on 2017/1/21.
 * 描述：
 */
// TodoStore作用
// 1、存储数据：这里是数组
// 2、处理逻辑
// 3、提供函数返回数据

import TodoDispatcher from '../Dispatcher/TodoDispatcher';
import TodoConstant from '../Constants/TodoConstant';

// import {ReduceStore} from 'flux/utils';

// import EventEmitter from 'events';

const CHANGE_TODOS = "CHANGE_TODOS";

// 监听、触发监听、取消监听作用
// const _emitter = new EventEmitter();


let todos = [];

/**
 * 创建代办事项：id最后一项递增
 * @param title
 */
let createItem = (todos, title) => {
    let newID = todos.length === 0 ? 101 : todos[todos.length - 1].id + 1;

    todos.push({
        id: newID,
        complete: false,
        title: title
    });

    return todos;
}

/**
 * 根据id删除代办事项
 * @param id
 */
let deleteItem = (todos, id) => {

    let index = todos.findIndex((item)=>{
        return item.id === id;
    });

    let dele = todos.splice(index, 1);
    console.log("删除item=" + dele);

    return todos;
}

/**
 * 改变事项属性：complete
 * @param data
 */
let changeItem = (todos, data) => {

    let index = todos.findIndex((item)=>{
        return item.id === data.id;
    });

    todos.splice(index, 1, {
        id: data.id,
        complete: !data.complete,
        title: data.title
    });

    return todos;
}

const TodoStore = {

    // 提供get方法，提供给View去获取数据（返回数据）
    getTodos() {
        return todos;
    },

    // addObserver(callback) {
    //     // 监听，将callback和某个字符串绑定起来  回调view中传进来的函数
    //     _emitter.on(CHANGE_TODOS, callback);
    //
    //     // 取消监听
    //     return () => _emitter.removeListener(CHANGE_TODOS, callback);
    // },
    //
    // // 只要TodoAction中的函数被调用了，就会到这里执行如下回调函数
    // // 传过来的数据叫action,根据type类型来区分具体调用什么逻辑
    // _dispatcherToken: TodoDispatcher.register((action) => {
    //     switch (action.type) {
    //         case TodoConstant.LOAD_DATA:
    //             todos = action.todos;
    //             break;
    //
    //         case TodoConstant.CREATE_ITEM:
    //             todos = createItem(todos, action.title);
    //             break;
    //
    //         case TodoConstant.DELETE_ITEM:
    //
    //             todos = deleteItem(todos, action.id);
    //
    //             break;
    //         case TodoConstant.CHANGE_ITEM:
    //
    //             todos = changeItem(todos, action.data);
    //
    //             break;
    //         default:
    //             break;
    //     }
    //
    //     // 触发监听
    //     _emitter.emit(CHANGE_TODOS);
    // })


};

export default TodoStore;