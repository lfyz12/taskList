import React, {useContext} from 'react';
import './App.css';
import {Context} from "./index";
import TaskList from "./components/TaskList";
import CreateTaskForm from "./components/CreateTaskForm";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  const {taskStore} = useContext(Context)
    console.log(taskStore.currentTask)
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default observer(App);
