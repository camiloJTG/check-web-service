import { genSalt, hash, compare } from 'bcrypt';

export const generateSalts = async () => {
  try {
    const result = await genSalt(3);
    return result;
  } catch (e) {
    console.error(e.message);
  }
};

export const encrypt = async (data: string) => {
  try {
    const salts = await generateSalts();
    if (typeof salts === 'undefined')
      throw new Error('Error in generate encrypted');
    const result = await hash(data, salts);
    return result;
  } catch (e) {
    console.error(e.message);
  }
};

export const validateHash = async (data: string, dataEncrypted: string) => {
  try {
    const isValid = await compare(data, dataEncrypted);
    return isValid;
  } catch (e) {
    console.error(e.message);
  }
};
