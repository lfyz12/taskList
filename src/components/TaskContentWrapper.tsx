import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

const TaskContentWrapper = () => {
    const {taskStore} = useContext(Context)
    const {taskId} = useParams()
    const [name, setName] = useState<string>(taskStore.currentTask.name)
    const [text, setText] = useState<string>(taskStore.currentTask.text)

    useEffect(() => {
        setName(taskStore.currentTask.name);
        setText(taskStore.currentTask.text);
    }, [taskStore.currentTask, taskId]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        taskStore.updateTaskListAfterUpdateName(taskId!, newName);
    };


    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText);
        taskStore.updateTaskListAfterUpdateText(taskId!, newText);
    };


    return (
        <div className='w-full h-full flex flex-col'>
            <input type="text" value={name} onChange={handleNameChange}
                   className='text-4xl h-16 border-none outline-0 bg-transparent font-semibold mb-2'
                   placeholder='Название'
            />
            <hr/>

            <textarea
                value={text}
                onChange={handleTextChange}
                className='text-lg font-medium mt-2 ms-2 w-full flex-1 p-2 border-none resize-none outline-none bg-transparent'
                placeholder="Напишите что хотите"
            />
        </div>
    );
};

export default TaskContentWrapper;