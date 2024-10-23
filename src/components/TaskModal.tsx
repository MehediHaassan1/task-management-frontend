"use client";

import React, { ChangeEvent, useState, FormEvent, KeyboardEvent } from 'react';
import styles from '../styles/taskModal.module.css';
import { ITask } from '@/types';

interface IProps {
  task: ITask;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  setTask: (newTask: ITask) => void
}

const TaskModal = ({ task, isEditing, onSave, onCancel, setTask }:IProps) => {
  const maxDescriptionLength = 120;
  const [remainingChars, setRemainingChars] = useState(maxDescriptionLength - task?.description.length);

  const handleDescriptionChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxDescriptionLength) {
      setTask({ ...task, description: inputValue });
      setRemainingChars(maxDescriptionLength - inputValue.length);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const currentInputValue = e.currentTarget.value;
      const tags = task?.tags;
  
      if (currentInputValue.trim() === '') {
        e.preventDefault();
  
        if (tags.length > 0) {
          const updatedTags = tags.slice(0, -1);
          setTask({ ...task, tags: updatedTags });
        }
      } else if (currentInputValue.endsWith(', ')) {
        const trimmedInput = currentInputValue.slice(0, -2);
        e.currentTarget.value = trimmedInput;
      }
    }
  };
  

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task?.title || ''}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Task title"
            required
          />
          <div className={styles.descriptionWrapper}>
            <textarea
              value={task?.description || ''}
              onChange={handleDescriptionChange}
              placeholder="Task description"
              maxLength={maxDescriptionLength}
              required
            />
            <small className={styles.charCount}>{remainingChars} characters remaining</small>
          </div>
          <input
            type="date"
            value={task?.dueDate|| ''}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            required
          />
          <select
            value={task?.priority || ''}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            value={task?.tags.join(', ') || ''}
            onKeyUp={handleKeyUp} // Add keydown event listener
            onChange={(e) =>
              setTask({
                ...task,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            placeholder="Tags (comma-separated)"
          />
          <div className={styles.modalActions}>
            <button type="submit">{isEditing ? 'Save' : 'Add Task'}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;