import React, {useContext} from 'react';
import './App.css';
import {Context} from "./index";
import CreateTaskForm from "./components/CreateTaskForm";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
  const {taskStore} = useContext(Context)
  return (
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default observer(App);
