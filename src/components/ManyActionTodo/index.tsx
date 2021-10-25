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
        const executeTodos = myTodos.filter((el: Todo) => el.select === true);
        if (executeTodos.length) {
            await asyncForEach(executeTodos, async (el: Todo) => {
                if (!el.done) {
                    await updateTodo(el.id + '');
                }
            });
            setLoadTodo(prev => true);
        }
    }

    async function deleteSelected() {
        const delTodos = myTodos.filter((el: Todo) => el.select === true);
        if (delTodos.length) {
            await asyncForEach(delTodos, async (el: Todo) => {
                await deleteTodo(el.id + '');
            });
            setLoadTodo(prev => true);
        }
    }

    return (
        <div className="ManyActionTodo">
            <button type="button" onClick={selectAll}>Выбрать все</button>
            <button type="button" onClick={clearAll}>Отчистить выбор
            </button>
            <button type="button" onClick={executeSelected}>Выполнить выбранное
            </button>
            <button type="button" onClick={deleteSelected}>Удалить выбранное
            </button>
        </div>
    );
}

export default ManyActionTodo;
