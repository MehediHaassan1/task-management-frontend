"use client";

import { Edit } from 'lucide-react';
import { useEffect, useState } from 'react';
import TaskModal from './TaskModal';
import { ITask } from '@/types';
import { useUpdateTaskMutation } from '@/redux/features/tasks/tasksApi';

interface IProps {
  task: ITask;
}

const UpdateTask = ({ task }: IProps) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [handleUpdateTask, {isError, isSuccess}] = useUpdateTaskMutation()

  const [newTask, setNewTask] = useState<ITask>({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'Low',
    tags: task?.tags || [],
  });

  const updateTask = (updatedTask: ITask) => {
    const updatedTags = updatedTask?.tags?.filter(tag => tag !== '');
    const data = {
      ...updatedTask,
      tags : updatedTags,
    }

    handleUpdateTask({data, id:task?._id});
  };

  useEffect(() => {
    if(isSuccess){
 setIsUpdateModalOpen(false);
    }
    if(isError){
     console.log("Error when updating...!!!")
    }
  }, [isError, isSuccess])

  return (
    <div>
      <button
        style={{ width: '40px', height: '40px' }}
        onClick={() => setIsUpdateModalOpen(true)}
      >
        <Edit size={20} />
      </button>

      {isUpdateModalOpen && (
        <TaskModal
          task={newTask}
          isEditing={true}
          onSave={() => updateTask(newTask)}
          onCancel={() => setIsUpdateModalOpen(false)}
          setTask={setNewTask}
        />
      )}
    </div>
  );
};

export default UpdateTask;
