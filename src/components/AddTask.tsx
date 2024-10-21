"use client";

import { Plus } from "lucide-react";
import styles from "../styles/addTask.module.css";
import { useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import { ITask } from "@/types";
import { useCreateTaskMutation } from "@/redux/features/tasks/tasksApi";

const AddTask = () => {
    // Initialize newTask using ITask interface
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTask, setNewTask] = useState<ITask>({
        title: "",
        description: "",
        dueDate: "",
        priority: "Low", // Matches the ITask type
        tags: [], // Initialize as an array of strings
    });
    
    const [handleAddTask, { isError, isSuccess }] = useCreateTaskMutation();

    // Function to add a new task
    const addTask = (task: ITask) => {
        handleAddTask(task);
    };

    // Effect to handle success or error responses
    useEffect(() => {
        if (isError) {
            console.log("Error is happening!");
        }
        if (isSuccess) {
            console.log("Task Create Success!");
            setIsAddModalOpen(false);
            setNewTask({
                title: "",
                description: "",
                dueDate: "",
                priority: "Low", // Reset to default
                tags: [], // Reset tags array
            });
        }
    }, [isError, isSuccess]);

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
