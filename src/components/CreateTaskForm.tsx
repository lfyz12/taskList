import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

const CreateTaskForm = () => {
    const {taskStore} = useContext(Context)
    const [name, setName] = useState<string>('')
    const [text, setText] = useState<string>('')
    const navigate = useNavigate()
    const createTask = () => {
        taskStore.createNewTask(name, text)
        navigate('/taskList')
    }

    return (
        <div className="w-full h-full flex flex-col">
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="text-4xl h-16 border-none outline-0 bg-transparent font-semibold mb-2"
                placeholder="Название"
            />
            <hr/>

            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className="text-lg font-medium mt-2 ms-2 w-full flex-grow p-2 border-none resize-none outline-none bg-transparent"
                placeholder={`${name.trim() === '' ? 'Сначала напишите название задачи' : 'Напишите что хотите'}`}
                readOnly={name.trim() === ''}
            />

            {name && name.trim() !== '' ? (
                <button
                    onClick={createTask}
                    className="bg-white rounded-lg h-10 border border-gray-300 mt-2"
                >
                    Добавить задачу
                </button>
            ) : null}
        </div>
    );
};

export default CreateTaskForm;