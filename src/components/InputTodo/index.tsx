import React from 'react';

import './InputTodo.css';
import Todos from '../Todos';
import ManyActionTodo from "../ManyActionTodo";
import {Todo} from "../../types/Todo";
import {getTodo, creatTodo} from "../../request";


function InputTodo() {
    const [myTodos, setMyTodos] = React.useState<Todo[]>([]);
    const [myTodo, setMyTodo] = React.useState<string>('');
    const [loadTodo, setLoadTodo] = React.useState<boolean>(false);

    async function changTodo() {
        if (myTodo.length) {
            const data = {title: myTodo};
            await creatTodo(data);
            setLoadTodo(!loadTodo);
            setMyTodo("");
        } else {
            alert('Вы не ввели задачу!')
        }
    }

    function changTodos(e: { target: { value: string } }) {
        setMyTodo(e.target.value);
    }

    React.useEffect(() => {
        getTodo().then(data => {
            console.log('data', data);
            const todos: Todo[] = [];
            data.forEach((el: any) => {
                const todo: Todo = {
                    id: el._id,
                    title: el.title,
                    done: el.isCompleted,
                    select: false,
                }
                todos.push(todo);
            });
            setMyTodos(todos);
        });
    }, [loadTodo]);

    return (
        <div className="Wrap">
            <div>ToDo</div>
            <div className="InputWrap">
                <input onChange={changTodos} value={myTodo}/>
                <button type="button" onClick={changTodo}>Добавить</button>
            </div>
            <ManyActionTodo setMyTodos={setMyTodos}/>
            <Todos myTodos={myTodos} setMyTodos={setMyTodos} setLoadTodo={setLoadTodo}/>
        </div>
    );
}

export default InputTodo;
