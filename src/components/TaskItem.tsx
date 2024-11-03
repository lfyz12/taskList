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
        <div onClick={pickCurrentTask} className="w-full h-full flex flex-col items-center space-x-2 p-2">
            <div className="w-full h-24 flex items-center space-x-2 p-2  border rounded-md relative">
                <input
                    type="checkbox"
                    checked={task.status}
                    onClick={markTask}
                    className="h-5 w-5"
                />

                {taskStore.orderedList && <span className="mr-2 text-blue-500 absolute top-0 left-0 text-base">{task.id}</span>}

                <Link to={`taskItem/${task.id}`} className="flex-grow text-blue-500 hover:underline">
                    {task.name}
                </Link>

                <button onClick={handleToggleShow} className="w-5 h-5 flex items-center justify-center">
                    <svg
                        className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
                            show ? 'rotate-0' : '-rotate-90'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>


                <button onClick={deleteTask}
                        className="text-red-500 border rounded-md w-7 h-7  flex items-center justify-center border-red-500">
                    -
                </button>

                <Link to="new">
                    <button
                        className="text-blue-500 border rounded-md w-7 h-7  flex items-center justify-center border-blue-500">
                        +
                    </button>
                </Link>

            </div>

            {show && <TaskList taskList={task.taskList}/>}
        </div>
    );

};

export default observer(TaskItem);