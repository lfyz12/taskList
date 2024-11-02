import React, {FC, useContext, useState} from 'react';
import {ITask} from "../types/types";
import {Context} from "../index";
import TaskList from "./TaskList";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";

interface taskItemProps {
    task: ITask
}

const TaskItem: FC<taskItemProps> = ({task}: taskItemProps) => {
    const {taskStore} = useContext(Context)
    const [show, setShow] = useState<boolean>(false)
    const navigate = useNavigate()
    const handleToggleShow = () => setShow(!show)
    const pickCurrentTask = (e: React.MouseEvent) => {
        e.stopPropagation()
        taskStore.setCurrentTask(task)
    }

    const deleteTask = (e: React.MouseEvent) => {
        e.stopPropagation()
        taskStore.setCurrentTask(task)
        taskStore.updateTaskListAfterDeletion()
    }

    const markTask = (e: React.MouseEvent) => {
        e.stopPropagation()
        taskStore.setCurrentTask(task)
        taskStore.updateTaskListAfterMark()
    }
    return (
        <div onClick={pickCurrentTask} className='w-full'>
            <input type={"checkbox"} checked={task.status} onClick={markTask}/>

            {taskStore.orderedList && task.id}

            <Link to={`taskItem/${task.id}`}>{task.name}</Link>

            <button onClick={handleToggleShow}>↓</button>

            <button className='' onClick={deleteTask}>
                -
            </button>

            <Link to='new'><button className=''>
                +
            </button></Link>


            {show && <TaskList taskList={task.taskList}/>}
        </div>
    );
};

export default observer(TaskItem);