import React, {FC} from 'react';
import {ITask} from "../types/types";
import TaskItem from "./TaskItem";
import {observer} from "mobx-react-lite";

interface taskListProps {
    taskList: ITask[]
}
const TaskList: FC<taskListProps> = ({taskList}: taskListProps) => {

    return (
        <div className='me-2'>
            {
                taskList.map(task =>
                <TaskItem task={task}/>)
            }
        </div>
    );
};

export default observer(TaskList);