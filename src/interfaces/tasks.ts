export interface ICreateTasks {
  name: string;
  isCompleted: boolean;
  description: string;
  groupId: number;
  updatedAt: Date;
}

export interface IUpdateTask {
  name: string;
  isCompleted: boolean;
  description: string;
  updatedAt: Date;
}
