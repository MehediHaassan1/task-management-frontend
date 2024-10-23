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
    const [filterPriority, setFilterPriority] = useState<"High" | "Medium" | "Low" | "All">("All");
    const [filterTag, setFilterTag] = useState<string | "All">("All");
    
    // State for managing the open/close of the "All Tasks" section
    const [isAllTasksOpen, setIsAllTasksOpen] = useState(true);

    // Pass the filter values to the hook
    const { data, isLoading } = useGetTasksQuery({
        search: searchTerm,
        status: filterStatus,
        priority: filterPriority,
        tag: filterTag,
    });

    const uniqueTags = useMemo((): string[] => {
        const allTags = data?.data?.map((task: ITask) => task?.tags).flat() || [];
        return Array.from(new Set(allTags)) as string[];
    }, [data]);

    // Group tasks by tag
    const groupedTasks = useMemo(() => {
        if (!data?.data) return {};
        return data?.data?.reduce((acc: { [key: string]: ITask[] }, task: ITask) => {
            const tags = task?.tags || ["No Tag"];
            tags.forEach(tag => {
                if (!acc[tag]) {
                    acc[tag] = [];
                }
                acc[tag].push(task);
            });
            return acc;
        }, {});
    }, [data]);

    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (tag: string) => {
        setOpenSections(prev => ({ ...prev, [tag]: !prev[tag] }));
    };

    const toggleAllTasksSection = () => {
        setIsAllTasksOpen(prev => !prev);
    };

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
                    onChange={(e) => setFilterStatus(e.target.value as string | "All")}
                    className={styles.filterSelect}
                >
                    <option value="All">Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value as "High" | "Medium" | "Low" | "All")}
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

            {/* Collapsible section for 'All' tasks */}
            <div className={styles.collapsibleSection}>
                <h3 onClick={toggleAllTasksSection} className={styles.collapsibleHeader}>
                    All Tasks ({data?.data?.length || 0}) {isAllTasksOpen ? '−' : '+'}
                </h3>
                {isAllTasksOpen && (
                    <div className={styles.taskList}>
                        {data?.data?.map((task: ITask) => (
                            <TaskCard key={task?._id} task={task} />
                        ))}
                    </div>
                )}
            </div>

            {/* Collapsible sections for each tag */}
            {Object?.keys(groupedTasks)?.map(tag => (
                <div key={tag} className={styles.collapsibleSection}>
                    <h3 onClick={() => toggleSection(tag)} className={styles.collapsibleHeader}>
                        {tag} ({groupedTasks[tag]?.length}) {openSections[tag] ? '−' : '+'}
                    </h3>
                    {openSections[tag] && (
                        <div className={styles.taskList}>
                            {groupedTasks[tag]?.map((task: ITask) => (
                                <TaskCard key={task._id} task={task} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Tasks;
