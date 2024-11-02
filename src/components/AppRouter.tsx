import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import TaskList from "./TaskList";
import Home from "./Home";
import taskList from "./TaskList";
import {Context} from "../index";
import CreateTaskForm from "./CreateTaskForm";
import {observer} from "mobx-react-lite";
import TaskContentWrapper from "./TaskContentWrapper";

const AppRouter = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Home/>}>
                <Route path={'new'} element={<CreateTaskForm/>}/>
                <Route path={'taskItem/:taskId'} element={<TaskContentWrapper/>}/>
            </Route>
        </Routes>
    );
};

export default observer(AppRouter);