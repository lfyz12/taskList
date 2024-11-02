import React, {FC, useContext, useState} from 'react';
import {ITask} from "../types/types";
import {Context} from "../index";
import TaskList from "./TaskList";
import {observer} from "mobx-react-lite";

interface taskItemProps {
    task: ITask
}

const TaskItem: FC<taskItemProps> = ({task}: taskItemProps) => {
    const {taskStore} = useContext(Context)
    const [show, setShow] = useState<boolean>(false)
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
    return (
        <div onClick={pickCurrentTask}>
            <input type={"checkbox"} checked={task.status}/> {task.id} {task.name} <button onClick={handleToggleShow}>&21</button> <button onClick={deleteTask}>-</button>
            {show && <TaskList taskList={task.taskList}/>}
        </div>
    );
};

export default observer(TaskItem);