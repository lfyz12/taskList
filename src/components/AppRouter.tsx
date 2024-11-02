import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import TaskList from "./TaskList";
import Home from "./Home";
import taskList from "./TaskList";
import {Context} from "../index";
import CreateTaskForm from "./CreateTaskForm";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {taskStore} = useContext(Context)
    console.log(taskStore.taskList)
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}>
                <Route path={'taskList'} element={<TaskList taskList={taskStore.taskList}/>}/>
                <Route path={'new'} element={<CreateTaskForm/>}/>
            </Route>
        </Routes>
    );
};

export default observer(AppRouter);