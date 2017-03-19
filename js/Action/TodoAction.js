/**
 * Created by ywq on 2017/1/21.
 * 描述：
 */

import TodoDispatcher from '../Dispatcher/TodoDispatcher';
import TodoConstant from '../Constants/TodoConstant';
const TodosJson = require('../todos.json');

// Actions
// Action Creator
const TodoAction = {

    loadData() {
        // Dispatcher分发
        TodoDispatcher.dispatch({
            type: TodoConstant.LOAD_DATA,
            todos: TodosJson
        });
    },

    createItem(title) {
        TodoDispatcher.dispatch({
            type: TodoConstant.CREATE_ITEM,
            title: title
        });
    },

    deleteItem(id) {
        TodoDispatcher.dispatch({
            type: TodoConstant.DELETE_ITEM,
            id: id
        });
    },

    changeItem(data) {
        TodoDispatcher.dispatch({
            type: TodoConstant.CHANGE_ITEM,
            data: data
        });
    }


};

export default TodoAction;
