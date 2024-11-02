import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Link} from "react-router-dom";
import taskList from "./TaskList";

const CreateTaskForm = () => {
    const {taskStore} = useContext(Context)
    const [name, setName] = useState<string>('')
    const [text, setText] = useState<string>('')
    const createTask = () => {
        taskStore.createNewTask(name, text)
    }
    return (
        <div>
            <input type={"text"} placeholder={'Название'} value={name} onChange={e => setName(e.target.value)}/>
            <input type={"text"} placeholder={'Текст'} value={text} onChange={e => setText(e.target.value)}/>
            <button onClick={createTask}>Создать</button>
        </div>
    );
};

export default CreateTaskForm;