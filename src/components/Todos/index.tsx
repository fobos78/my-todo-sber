import React from 'react';

import './Todos.css';
import {Todo} from "../../types/Todo";
import {deleteTodo, updateTodo} from "../../request";

interface ITodos {
    myTodos: Todo[],
    setMyTodos: (myTodos: (prev: Todo[]) => Todo[]) => void,
    setLoadTodo: (loadTodo: (prev: boolean) => boolean) => void,
}

function Todos({myTodos, setMyTodos, setLoadTodo}: ITodos) {

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [description, setDescription] = React.useState('');

    async function checkBox(id: number, done: boolean) {
        if (done) {
            return;
        }
        await updateTodo(id + '');
        setLoadTodo(prev => true);
    }


    async function delTodo(id: number) {
        await deleteTodo(id + '');
        setLoadTodo(prev => true);
    }

    function checkSelect(id: number, select: boolean) {
        select ? doneSelect(id) : notDoneSelect(id);
    }

    function doneSelect(id: number) {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            if (el.id === id) {
                el.select = false;
                return el;
            } else {
                return el;
            }
        }));
    }

    function notDoneSelect(id: number) {
        setMyTodos((prev: Todo[]) => prev.map((el: Todo) => {
            if (el.id === id) {
                el.select = true;
                return el;
            } else {
                return el;
            }
        }));
    }

    const showModalCustom = (id: number) => {
        const todo = myTodos.find(el => id === el.id);
        setDescription(JSON.stringify(todo));
        setIsModalVisible(true);
    };

    const hideModalCustom = () => {
        setIsModalVisible(false);
        setDescription('');
    };


    return (
        <>
            {
                isModalVisible &&
                <div className="RootModalCustom" onClick={hideModalCustom}>
                    <div className="WrapModalCustom" onClick={(e) => e.stopPropagation()}>
                        <div className="ModalHeader">
                            Выбранная задача
                        </div>
                        <div className="DataInfoPre">
                            <div className="DataInfoCode">
                                {description}
                            </div>
                        </div>
                        <div className="ModalFooter">
                            <button onClick={hideModalCustom}>Закрыть</button>
                        </div>
                    </div>
                </div>
            }

            <div className="Todos">
                {myTodos && myTodos.map(todo =>
                    <div key={todo.id} className="WrapTodo">
                        <div className="Action"
                             style={{backgroundColor: todo.select ? "lightgreen" : "white"}}
                             onClick={() => checkSelect(todo.id, todo.select)}
                        />
                        <div className="Todo">
                            <div
                                className="TodoText"
                                onClick={() => showModalCustom(todo.id)}
                            >
                                <div
                                    className={todo.done ? "CrossText" : "none"}

                                >{todo.title}
                                </div>
                            </div>
                            <div className="Btn">
                                <input type="checkbox" checked={todo.done}
                                       onChange={() => checkBox(todo.id, todo.done)}/>
                                <button type="button" onClick={() => delTodo(todo.id)}>Удалить</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
}

export default Todos;
