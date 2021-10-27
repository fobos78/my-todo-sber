import React from 'react';

import './ManyActionTodo.css';
import {Todo} from "../../types/Todo";
import {deleteTodo, updateTodo} from "../../request";
import {asyncForEach} from "../../utils";

interface IManyActionTodo {
    myTodos: Todo[],
    setMyTodos: (myTodos: (prev: Todo[]) => Todo[]) => void,
    setLoadTodo: (loadTodo: (prev: boolean) => boolean) => void;
}

function ManyActionTodo({myTodos, setMyTodos, setLoadTodo}: IManyActionTodo) {

    const [selectTodos, setSelectTodos] = React.useState<Todo[]>([]);

    function selectAll() {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            el.select = true;
            return el;
        }));
    }

    function clearAll() {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            el.select = false;
            return el;
        }));
    }

    async function executeSelected() {
        if (selectTodos.length) {
            await asyncForEach(selectTodos, async (el: Todo) => {
                if (!el.done) {
                    await updateTodo(el.id + '');
                }
            });
            setLoadTodo(prev => true);
        }
    }

    async function deleteSelected() {
        if (selectTodos.length) {
            await asyncForEach(selectTodos, async (el: Todo) => {
                await deleteTodo(el.id + '');
            });
            setLoadTodo(prev => true);
        }
    }

    React.useEffect(() => {
        setSelectTodos(myTodos.filter((el: Todo) => el.select === true));
    },[myTodos]);

    return (
        <div className="ManyActionTodo">
            <button type="button" onClick={selectAll}>Выбрать все</button>
            <button type="button" onClick={clearAll}>Отчистить выбор
            </button>
            <button type="button"
                    disabled={!selectTodos.filter((todo) => todo.select !== todo.done).length}
                    onClick={executeSelected}>
                Выполнить выбранное
            </button>
            <button type="button"
                    disabled={!selectTodos.length}
                    onClick={deleteSelected}>
                Удалить выбранное
            </button>
        </div>
    );
}

export default ManyActionTodo;
