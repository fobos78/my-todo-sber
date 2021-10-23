import React from 'react';

import './ManyActionTodo.css';
import {Todo} from "../../types/Todo";

interface IManyActionTodo{
    setMyTodos: (myTodos: (prev: Todo[]) => Todo[]) => void,
}

function ManyActionTodo({setMyTodos}: IManyActionTodo) {

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

    function deleteSelected() {
        setMyTodos((prev: Todo[]) => prev.filter((el: Todo) => el.select !== true));
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
