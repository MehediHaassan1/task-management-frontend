"use client"

import { Edit } from 'lucide-react';
import { useState } from 'react';
import TaskModal from './TaskModal';
import { ITask } from '@/types';

const UpdateTask = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Low', tags: [] });

  const addTask = (task:ITask) => {
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', dueDate: '', priority: 'Low', tags: [] });
    setIsUpdateModalOpen(false);
  };

  // console.log(tasks)

  return (
    <div >
      <button 
      style={{width: '40px', height: '40px'}} 
      onClick={() => setIsUpdateModalOpen(true)}
      >
          <Edit size={20} />
        </button>

        {isUpdateModalOpen && <TaskModal
          task={newTask}
          isEditing={true}
          onSave={() => addTask(newTask)}
          onCancel={() => setIsUpdateModalOpen(false)}
          setTask={setNewTask}
        />}

    </div>
  );
};

export default UpdateTask;