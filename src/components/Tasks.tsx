/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useGetTasksQuery } from "@/redux/features/tasks/tasksApi";
import TaskCard from "./TaskCard";
import { ITask } from "@/types";
import { useState, useMemo } from "react";
import styles from "../styles/tasks.module.css";

const Tasks = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string | "All">("All");
    const [filterPriority, setFilterPriority] = useState<
        "High" | "Medium" | "Low" | "All"
    >("All");
    const [filterTag, setFilterTag] = useState<string | "All">("All");

    // Pass the filter values to the hook
    const { data, isLoading } = useGetTasksQuery({
        search: searchTerm,
        status: filterStatus,
        priority: filterPriority,
        tag: filterTag,
    });

    const uniqueTags = useMemo((): string[] => {
        const allTags = data?.map((task: ITask) => task?.tags).flat() || [];
        return Array.from(new Set(allTags)) as string[];
    }, [data]);

    if (isLoading) return <div>Loading ...</div>;

    return (
        <div>
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />

                <select
                    value={filterStatus}
                    onChange={(e) =>
                        setFilterStatus(e.target.value as string | "All")
                    }
                    className={styles.filterSelect}
                >
                    <option value="All">Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    value={filterPriority}
                    onChange={(e) =>
                        setFilterPriority(
                            e.target.value as "High" | "Medium" | "Low" | "All"
                        )
                    }
                    className={styles.filterSelect}
                >
                    <option value="All">Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="All">Tags</option>
                    {uniqueTags?.map((tag: string) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                {data?.map((task: ITask, index: number) => (
                    <TaskCard key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Tasks;
