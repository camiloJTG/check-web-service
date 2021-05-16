import { getRepository } from 'typeorm';
import { Users } from '../models/users';
import { ICreateUser, IUpdateUser, ILogin } from '../interfaces/users';
import { encrypt, validateHash } from '../utils/bcrypt';
import { createToken } from '../utils/jwt';

export const createUser = async (user: ICreateUser) => {
  try {
    // Create repository
    const userRepository = getRepository(Users);

    // Validate if mail has already registered
    const searchMail = await userRepository.find({
      where: { mail: user.mail },
    });
    if (searchMail.length !== 0)
      return `The mail ${user.mail} has already registered`;

    // Hash the password
    const hashPassword = await encrypt(user.password);
    if (!hashPassword) return `Error in encrypt module`;

    // Set hash password and updatedAt
    user.password = hashPassword;
    user.updatedAt = new Date();

    // Create new user
    const newUser = await userRepository.save(user);

    return newUser;
  } catch (e) {
    console.error(e.message);
  }
};

export const getUser = async (id: number) => {
  try {
    // Create repository
    const userRepository = getRepository(Users);

    // Find data
    const findData = await userRepository.findOne(id);
    if (!findData) return `No data found`;
    return findData;
  } catch (e) {
    console.error(e.message);
  }
};

export const updateUser = async (id: number, user: IUpdateUser) => {
  try {
    // Create repository
    const userRepository = getRepository(Users);

    // Validate if id has registered
    const findData = await userRepository.findOne(id);
    if (!findData) return `No data found`;

    // Update mail
    if (user.mail) {
      const findMail = await userRepository.find({
        where: { mail: user.mail },
      });
      if (findMail.length !== 0)
        return `The mail ${user.mail} has already registered`;
      await userRepository.save({
        id: id,
        mail: user.mail,
        updatedAt: new Date(),
      });
    }

    // Update password
    if (user.password) {
      const hashPass = await encrypt(user.mail);
      if (!hashPass) return `Error en hash password`;
      await userRepository.save({
        id: id,
        password: hashPass,
        updatedAt: new Date(),
      });
    }

    // Finda updated data
    const findResult = await userRepository.findOne(id);
    if (!findResult) return `No data found`;
    return findResult;
  } catch (e) {
    console.error(e.message);
  }
};

export const login = async (login: ILogin) => {
  try {
    // Create repository
    const userRepository = getRepository(Users);

    // Validate if mail is correct
    const searchData = await userRepository.find({
      where: { mail: login.mail },
    });
    if (searchData.length === 0) return `Invalid credentials`;

    // Validate if password is correct
    const descryptPassword = await validateHash(
      login.password,
      searchData[0].password
    );
    if (typeof descryptPassword === 'undefined')
      return `Error in validate password`;
    if (!descryptPassword) return `Invalid Credentials`;

    // Create token
    const token = createToken({ id: searchData[0].id, mail: login.mail });
    return token;
  } catch (e) {
    console.error(e.message);
  }
};
