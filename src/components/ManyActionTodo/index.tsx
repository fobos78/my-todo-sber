import React from 'react';

import './ManyActionTodo.css';
import {Todo} from "../../types/Todo";
import {deleteTodo} from "../../request";
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

    function executeSelected() {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            if (!el.done) {
                el.done = el.select;
            }
            return el;
        }));
    }

    async function deleteSelected() {
        setMyTodos((prev: Todo[]) => prev.filter((el: Todo) => el.select !== true));
        const delTodos = myTodos.filter((el: Todo) => el.select === true);
        await asyncForEach(delTodos, async (el: Todo) => {
            await deleteTodo(el.id + '');
        });
        setLoadTodo(prev => !prev);
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
