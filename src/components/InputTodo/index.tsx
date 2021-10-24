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

    async function addTodo() {
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
        getTodo()
            .then(data => {
            const todos: Todo[] = [];
            data && data.forEach((el: any) => {
                const todo: Todo = {
                    id: el._id,
                    title: el.title,
                    done: el.isCompleted,
                    select: false,
                }
                todos.push(todo);
            });
            setMyTodos(todos);
        })
            .catch(error => console.log('ERROR>>', error));
    }, [loadTodo]);

    return (
        <div className="Wrap">
            <div>ToDo</div>
            <div className="InputWrap">
                <input onChange={changTodos} value={myTodo}/>
                <button type="button" onClick={addTodo}>Добавить</button>
            </div>
            <ManyActionTodo myTodos={myTodos} setMyTodos={setMyTodos} setLoadTodo={setLoadTodo}/>
            <Todos myTodos={myTodos} setMyTodos={setMyTodos} setLoadTodo={setLoadTodo}/>
        </div>
    );
}

export default InputTodo;
