"use client";

import { Plus } from "lucide-react";
import styles from "../styles/addTask.module.css";
import { useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import { ITask } from "@/types";
import { useCreateTaskMutation } from "@/redux/features/tasks/tasksApi";

const AddTask = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low",
        tags: [],
    });
    const [handleAddTask, {isError, isSuccess}] = useCreateTaskMutation()


    const addTask = (task:ITask) => {
        handleAddTask(task)
        
    };

    useEffect(() => {
      if(isError){
        console.log("Error is happening!")
      }
      if(isSuccess){
        console.log('Task Create Success!')
        setIsAddModalOpen(false);
        setNewTask({
          title: "",
          description: "",
          dueDate: "",
          priority: "Low" as string,
          tags: [],
      });
      }
    },[isError, isSuccess])


    return (
        <div>
            <button
                style={{ width: "40px", height: "40px" }}
                className={styles.addTaskButton}
                onClick={() => setIsAddModalOpen(true)}
            >
                <Plus />
            </button>

            {isAddModalOpen && (
                <TaskModal
                    task={newTask}
                    isEditing={false}
                    onSave={() => addTask(newTask)}
                    onCancel={() => setIsAddModalOpen(false)}
                    setTask={setNewTask}
                />
            )}
        </div>
    );
};

export default AddTask;
