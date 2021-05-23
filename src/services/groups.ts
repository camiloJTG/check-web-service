import { getRepository } from 'typeorm';
import { Groups } from '../models/groups';
import { ICreateGroup, IUpdateGroup } from '../interfaces/groups';
import { getUser } from './users';
import { deleteByGroupId } from './tasks';

export const createGroup = async (group: ICreateGroup) => {
  try {
    // Create repository
    const groupRepository = getRepository(Groups);

    // Validate if userid is valid
    const searchUser = await getUser(group.userId);
    if (typeof searchUser === 'string' || typeof searchUser === 'undefined')
      return `The id ${group.userId} is not valid`;

    // Set updatedAt
    group.updatedAt = new Date();

    // Create new group
    const newGroup = await groupRepository.save(group);

    return newGroup;
  } catch (e) {
    console.error(e.message);
  }
};

export const getOneGroup = async (id: number) => {
  try {
    // Create repository
    const groupRepository = getRepository(Groups);

    // Validate if id exists
    const searchGroup = await groupRepository.findOne(id);
    if (!searchGroup) return `The id ${id} not found`;

    return searchGroup;
  } catch (e) {
    console.error(e.message);
  }
};

export const getAllGroupByUserId = async (id: number) => {
  try {
    // Create repository
    const groupRepository = getRepository(Groups);

    // Validate if exists data
    const searchData = await groupRepository.find({ where: { userId: id } });
    if (searchData.length === 0) return `NO data found`;
    return searchData;
  } catch (e) {
    console.error(e.message);
  }
};

export const updateGroup = async (id: number, group: IUpdateGroup) => {
  try {
    // Create repository
    const groupRepository = getRepository(Groups);

    // Search by id
    const searchId = await groupRepository.findOne(id);
    if (!searchId) return `The id ${id} not found`;

    if (group.name) {
      console.log(1);
      await groupRepository.save({
        id: id,
        name: group.name,
        updatedAt: new Date(),
      });
    }

    if (group.isFeatured !== null) {
      console.log(2);
      await groupRepository.save({
        id: id,
        isFeatured: group.isFeatured,
        updatedAt: new Date(),
      });
    }

    // Find update data
    const result = await groupRepository.findOne(id);
    if (!result) return `NO data found`;
    return result;
  } catch (e) {
    console.error(e.message);
  }
};

export const deleteGroup = async (id: number) => {
  try {
    // Create repository
    const groupRepository = getRepository(Groups);

    // Validate if id exists
    const searchGroup = await groupRepository.findOne(id);
    if (!searchGroup) return `The id ${id} not found`;

    // Delete all tasks
    await deleteByGroupId(id);
    await groupRepository.delete(id);
    return { status: 'ok' };
  } catch (e) {
    console.error(e.message);
  }
};
