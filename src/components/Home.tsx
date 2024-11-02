import React, {useContext} from 'react';
import {Link, Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import TaskList from "./TaskList";
import {Context, taskStore} from "../index";
import {ITask} from "../types/types";

const Home = () => {
    const {taskStore} = useContext(Context)
    const resetCurrentTask = () => {
        taskStore.setCurrentTask({} as ITask)
    }
    return (
        <div className="flex w-screen h-max min-h-screen text-gray-800 text-lg font-medium bg-gray-50">

            <div className="w-1/3 min-h-full p-4 bg-white shadow-md">
                <Link to="new">
                    <button
                        onClick={resetCurrentTask}
                        className="text-blue-500 border rounded-md w-full h-7  flex items-center justify-center border-blue-500">
                        +
                    </button>
                </Link>
                <TaskList taskList={taskStore.taskList}/>
            </div>

            <div className="h-full w-2/3 p-6">
                {taskStore.taskList.length === 0 ? <Outlet context='new'/> : <Outlet/>}
            </div>
        </div>
    );
};

export default observer(Home);