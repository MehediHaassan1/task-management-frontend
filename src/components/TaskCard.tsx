"use client";

import styles from "../styles/taskCard.module.css";
import { Bell, Check, Trash2 } from "lucide-react";
import UpdateTask from "./UpdateTask";
import { ITask } from "@/types";

interface IProps {
    task: ITask;
}

const TaskCard = ({ task }: IProps) => {

    return (
        <div>
            <div
                id={`task-${task?._id}`}
                className={`${styles.taskItem} ${task?.status} ${styles[`taskItem_${task?.priority.toLowerCase()}`]}`}
            >
                <div className={styles.taskContent}>
                    <h3>{task?.title}</h3>
                    <p>{task?.description}</p>
                    <div className={styles.taskMeta}>
                        <span className={styles.dueDate}>
                            Due: {task?.dueDate}
                        </span>
                        <span
                            className={`${styles.priority}  ${
                                styles[task?.priority.toLowerCase()]
                            }`}
                        >
                            {task?.priority}
                        </span>
                        <div className={styles.tags}>
                            {task?.tags?.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.taskActions}>
                    <button
                        id={`reminder_${task._id}`}
                        // onClick={() => toggleReminder(task.id)}
                        // className={`reminder-button ${
                        //     task.reminder ? "active" : ""
                        // }`}

                        className={styles.reminderButton}
                    >
                        <Bell size={20} />
                    </button>
                    <div
                        // onClick={() => setEditingTask(task)}
                        className="edit-button"
                    >
                        <UpdateTask task={task} />
                    </div>
                    <button
                        // onClick={() => deleteTask(task.id)}
                        className="deleteButton"
                    >
                        <Trash2 size={20} />
                    </button>
                    <button
                    // onClick={() => toggleTaskStatus(task.id)}
                    // className={`complete-button ${
                    //     task.status === "Completed" ? "completed" : ""
                    // }`}
                    >
                        {/* {task.status === "Completed" ? (
                        <X size={20} />
                    ) : (
                        <Check size={20} />
                      )} */}
                        <Check size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
