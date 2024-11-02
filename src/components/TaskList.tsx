import React, {FC} from 'react';
import {ITask} from "../types/types";
import TaskItem from "./TaskItem";
import {observer} from "mobx-react-lite";
import {taskStore} from "../index";

interface taskListProps {
    taskList: ITask[]
}
const TaskList: FC<taskListProps> = ({taskList}: taskListProps) => {

    return (
        <div className="ms-2 w-full">
            {taskList.map(task => (
                <TaskItem key={task.id} task={task}/>
            ))}
        </div>
    );
};

export default observer(TaskList);