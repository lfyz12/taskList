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

            <div className="w-1/3 min-h-full max-h-screen overflow-x-hidden p-4 bg-white shadow-md overflow-y-auto">
                <div className='w-full flex justify-around'>
                    <Link to="new" className='w-2/3'>
                        <button
                            onClick={resetCurrentTask}
                            className="text-blue-500 border rounded-md w-full h-7  flex items-center justify-center border-blue-500">
                            +
                        </button>
                    </Link>
                    <button
                        className='w-fit text-gray-400 text-base font-medium border rounded-md  max-h-7  flex items-center justify-center border-gray-400 p-3'
                        onClick={() => taskStore.toggleOrderedList()}>{taskStore.orderedList ? 'Убрать нумерацию' : 'Добавить нумерацию'}</button>
                </div>

                <TaskList taskList={taskStore.taskList}/>
            </div>

            <div className="min-h-full w-2/3 p-6 overflow-hidden">
                {taskStore.taskList.length === 0 ? <Outlet context='new'/> : <Outlet/>}
            </div>
        </div>
    );
};

export default observer(Home);