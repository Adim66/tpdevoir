export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  dueDate: string;
  project_id: number;
}
