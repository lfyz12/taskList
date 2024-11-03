import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import CreateTaskForm from "./CreateTaskForm";
import {observer} from "mobx-react-lite";
import TaskContentWrapper from "./TaskContentWrapper";
import NotPickPage from "./NotPickPage";

const AppRouter = () => {

    return (
        <Routes>
            <Route path={'/'} element={<Home/>}>
                <Route index element={<NotPickPage/>}/>
                <Route path={'new'} element={<CreateTaskForm/>}/>
                <Route path={'taskItem/:taskId'} element={<TaskContentWrapper/>}/>
            </Route>
        </Routes>
    );
};

export default observer(AppRouter);