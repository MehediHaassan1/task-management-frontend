/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { ITask } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import {
    restoreTask,
    temporarilyDeleteTask,
} from "@/redux/features/tasks/tasksSlice";
import UpdateTask from "./UpdateTask";
import { Bell, Check, Trash2, X } from "lucide-react";
import styles from "../styles/taskCard.module.css";
import {
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} from "@/redux/features/tasks/tasksApi";
import { calculateHoursLeft } from "@/utils/calculateHoursLeft";

interface IProps {
    task: ITask;
}

const TaskCard = ({ task }: IProps) => {
    const [handleDeleteTask] = useDeleteTaskMutation();
    const [updateStatus] = useUpdateTaskMutation();
    const [undoTimeoutId, setUndoTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [showUndoNotification, setShowUndoNotification] = useState(false);
    const [reminderOn, setReminderOn] = useState(false);
    const [hoursLeft, setHoursLeft] = useState<number | null>(null);
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(temporarilyDeleteTask({ taskId: task?._id }));

        const timeoutId = setTimeout(() => {
            handleDeleteTask(task?._id);
            setShowUndoNotification(false);
        }, 5000);

        setUndoTimeoutId(timeoutId);
        setShowUndoNotification(true);
    };

    const handleUndo = () => {
        if (undoTimeoutId) {
            clearTimeout(undoTimeoutId);
            dispatch(restoreTask({ taskId: task?._id }));
            setShowUndoNotification(false);
        }
    };

    useEffect(() => {
        if (undoTimeoutId) {
            const timer = setTimeout(() => {
                setShowUndoNotification(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [undoTimeoutId]);

    const handleStatusUpdate = (id: string, status: string) => {
        updateStatus({ id, data: { status } });
    };

    useEffect(() => {
        if (reminderOn) {
            setHoursLeft(calculateHoursLeft(task?.dueDate));
            const intervalId = setInterval(() => {
                setHoursLeft(calculateHoursLeft(task?.dueDate));
            }, 60000);

            return () => clearInterval(intervalId); 
        }
    }, [reminderOn, task?.dueDate]);

    return (
        <div>
            {showUndoNotification ? (
                <div className={styles.undoNotification}>
                    Task deleted.{" "}
                    <button className={styles.undoNotificationButton} onClick={handleUndo}>
                        Undo
                    </button>
                </div>
            ) : (
                <div
                    id={`task-${task?._id}`}
                    className={`${styles.taskItem} ${task?.status} ${
                        reminderOn ? styles.dueSoon : ''
                    } ${styles[`taskItem_${task?.priority.toLowerCase()}`]}`}
                >
                    <div className={styles.taskContent}>
                        <h3
                            className={task?.status === "Completed" ? styles.strikethrough : ""}
                        >
                            {task?.title}
                        </h3>
                        <p
                            className={task?.status === "Completed" ? styles.strikethrough : ""}
                        >
                            {task?.description}
                        </p>
                        <div className={styles.taskMeta}>
                            <span className={styles.dueDate}>
                                {reminderOn && hoursLeft !== null ? (
                                    `Due in ${Math.floor(hoursLeft)} hours`
                                ) : (
                                    `Due: ${task?.dueDate}`
                                )}
                            </span>
                            <span
                                className={`${styles.priority} ${
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
                            className={`${reminderOn ? styles.activeReminder : ''}`} 
                            onClick={() => setReminderOn(!reminderOn)}
                        >
                            <Bell size={20} />
                        </button>
                        <div className="edit-button">
                            <UpdateTask task={task} />
                        </div>
                        <button
                            onClick={handleDelete}
                            style={{ color: "red" }}
                        >
                            <Trash2 size={20} />
                        </button>
                        {task?.status === "Pending" ? (
                            <button
                                onClick={() =>
                                    handleStatusUpdate(
                                        task?._id as string,
                                        "Completed"
                                    )
                                }
                                style={{ color: "green" }}
                            >
                                <Check size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    handleStatusUpdate(
                                        task?._id as string,
                                        "Pending"
                                    )
                                }
                                style={{ color: "red" }}
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
