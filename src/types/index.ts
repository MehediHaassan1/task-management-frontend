export interface ITask {
  _id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status?: "Pending" | "Complete";
  tags: string[] | [];
  createdAt?: string;
  updatedAt?: string;
}