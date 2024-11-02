import React, {useContext} from 'react';
import {Link, Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";
import TaskList from "./TaskList";
import {Context, taskStore} from "../index";

const Home = () => {
    const {taskStore} = useContext(Context)

    return (
        <div className="flex w-screen h-screen text-gray-800 text-lg font-medium bg-gray-50">

            <div className="w-1/3 h-full p-4 bg-white shadow-md">
                <TaskList taskList={taskStore.taskList}/>
            </div>

            <div className="h-full w-2/3 p-6">
                {taskStore.taskList.length === 0 ? <Outlet context='new'/> : <Outlet/>}
            </div>
        </div>
    );
};

export default observer(Home);