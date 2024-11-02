import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {observer} from "mobx-react-lite";

const Home = () => {
    return (
        <div>
            <h1>Hey</h1>
            <nav>
                <Link to="taskList">Task List</Link>
                <Link to="new">Create New Task</Link>
            </nav>
            <Outlet/>
        </div>
    );
};

export default observer(Home);