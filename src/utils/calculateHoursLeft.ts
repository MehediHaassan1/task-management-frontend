export const calculateHoursLeft = (dueDate : string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const timeDifference = due.getTime() - now.getTime();
  const hoursUntilDue = timeDifference / (1000 * 60 * 60);
  return hoursUntilDue > 0 ? hoursUntilDue : 0; // Show 0 if the task is overdue
};