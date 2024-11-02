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
        navigate('/')
    }
    return (
        <div className="p-6 bg-white rounded-lg shadow-md space-y-4 m-auto">
            <input
                type="text"
                placeholder="Название"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Текст"
                value={text}
                onChange={e => setText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={createTask}
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
                Создать
            </button>
        </div>
    );
};

export default CreateTaskForm;