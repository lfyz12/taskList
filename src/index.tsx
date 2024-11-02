import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TaskStore from "./store/TaskStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface State {
    taskStore: TaskStore
}
export const taskStore = new TaskStore()
export const Context = createContext<State>({
    taskStore
})

root.render(
  <Context.Provider value={{
      taskStore
  }}>
    <App />
  </Context.Provider>
);

