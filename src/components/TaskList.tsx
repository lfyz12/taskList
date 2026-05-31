import React, {FC} from 'react';
import {ITask} from "../types/types";
import TaskItem from "./TaskItem";
import {observer} from "mobx-react-lite";

interface TaskListProps {
  tasks: ITask[]
  depth?: number
}

const TaskList: FC<TaskListProps> = ({tasks, depth = 0}) => {
  return (
    <div className='flex flex-col gap-1'>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} depth={depth}/>
      ))}
    </div>
  );
};

export default observer(TaskList);
