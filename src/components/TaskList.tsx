import React, {FC} from 'react';
import {ITask} from "../types/types";
import TaskItem from "./TaskItem";
import {observer} from "mobx-react-lite";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

interface TaskListProps {
  tasks: ITask[]
  depth?: number
}

const TaskList: FC<TaskListProps> = ({tasks, depth = 0}) => {
  return (
    <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
      <div className='flex flex-col gap-1'>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} depth={depth}/>
        ))}
      </div>
    </SortableContext>
  );
};

export default observer(TaskList);
