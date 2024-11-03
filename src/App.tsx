import React, {useContext} from 'react';
import './App.css';
import {Context} from "./index";
import CreateTaskForm from "./components/CreateTaskForm";
import {observer} from "mobx-react-lite";
import {BrowserRouter, HashRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  const {taskStore} = useContext(Context)
  return (
    <HashRouter basename='/taskList'>
        <AppRouter/>
    </HashRouter>
  );
}

export default observer(App);
