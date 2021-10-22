import React from 'react';
import './InputTodo.css';
import axios from "axios";

import Todos from '../Todos';
import ManyActionTodo from "../ManyActionTodo";

export interface Todo {
    id: number;
    title: string;
    done: boolean;
}

function InputTodo() {
    const [myTodos, setMyTodos] = React.useState<Todo[]>([]);
    const [myTodo, setMyTodo] = React.useState<string>('');

    function changTodo() {
        const id = Math.random();
        if (myTodo.length) {
            setMyTodos((prev) => [...prev, {id, title: myTodo, done: true}]);
            setMyTodo("");
        } else {
            alert('Вы не ввели задачу!')
        }
    }

    function changTodos(e: { target: { value: string } }) {
        setMyTodo(e.target.value);
    }

    return (
        <div className="Wrap">
            <div>ToDo</div>
            <div className="InputWrap">
                <input onChange={changTodos} value={myTodo}/>
                <button type="button" onClick={changTodo}>Добавить</button>
            </div>
            <ManyActionTodo />
            <Todos myTodos={myTodos} setMyTodos={setMyTodos}/>
        </div>
    );
}

export default InputTodo;
