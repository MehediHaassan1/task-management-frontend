import AddTask from "@/components/AddTask";
import styles from "./page.module.css";
import Tasks from "@/components/Tasks";

export default function Home() {
    return (
        <div className={styles.taskManager}>
            <div className={styles.header}>
                <h1>Task Manager</h1>
                <AddTask />
            </div>
            <div>
              <Tasks />
            </div>
        </div>
    );
}
