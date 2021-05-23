import { getRepository } from 'typeorm';
import { Tasks } from '../models/tasks';
import { ICreateTasks, IUpdateTask } from '../interfaces/tasks';
import { getOneGroup } from './groups';

export const createTasks = async (task: ICreateTasks) => {
  try {
    // Create repository
    const taskRepository = getRepository(Tasks);

    // Validate if id is valid
    const searchId = await getOneGroup(task.groupId);
    if (typeof searchId === 'string' || typeof searchId === 'undefined')
      return `The id ${task.groupId} is not valid`;

    // Set updatedAt
    task.updatedAt = new Date();

    // Create new group
    const newTask = await taskRepository.save(task);

    return newTask;
  } catch (e) {
    console.error(e.message);
  }
};

export const getOneTask = async (id: number) => {
  try {
    // Create repository
    const taskRepository = getRepository(Tasks);

    // Valdiate if id is valid
    const searchTask = await taskRepository.findOne(id);
    if (!searchTask) return `The id ${id} is not valid`;
    return searchTask;
  } catch (e) {
    console.error(e.message);
  }
};

export const getTasksByGroup = async (id: number) => {
  try {
    // Create repository
    const taskRepository = getRepository(Tasks);

    // Valdiate if id is valid
    const searchTask = await taskRepository.find({ where: { groupId: id } });
    if (searchTask.length === 0) return `No data found`;
    return searchTask;
  } catch (e) {
    console.error(e.message);
  }
};

export const updateTask = async (id: number, task: IUpdateTask) => {
  try {
    // Create repository
    const taskRepository = getRepository(Tasks);

    // Validate if id exists
    const searchTaskById = await taskRepository.findOne(id);
    if (!searchTaskById) return `The id ${id} not found`;

    // Update name
    if (task.name) {
      await taskRepository.save({
        id: id,
        name: task.name,
        updatedAt: new Date(),
      });
    }

    // Update complete
    if (task.isCompleted != null) {
      await taskRepository.save({
        id: id,
        isCompleted: task.isCompleted,
        updatedAt: new Date(),
      });
    }

    // Update description
    if (task.description) {
      await taskRepository.save({
        id: id,
        description: task.description,
        updatedAt: new Date(),
      });
    }

    // Find update data
    const result = await taskRepository.findOne(id);
    if (!result) return `NO data found`;
    return result;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteTask = async (id: number) => {
  try {
    // Create repository
    const taskRepository = getRepository(Tasks);

    // Validate if id exists
    const searchTaskById = await taskRepository.findOne(id);
    if (!searchTaskById) return `The id ${id} not found`;
    await taskRepository.delete(id);
    return { status: 'ok' };
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteByGroupId = async (id: number) => {
  try {
    // Create repository
    const taskRepository = getRepository(Tasks);

    // Search id group
    const searchGroup = await taskRepository.find({ where: { groupId: id } });
    if (searchGroup.length === 0) return `No data found`;

    // Delete file
    await taskRepository.delete({ groupId: id });
    return 1;
  } catch (e) {
    console.error(e.message);
  }
};
