import bcrypt from 'bcryptjs';
import { db } from '../db/db';

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createDefaultAdmin = async () => {
  const adminUsername = 'admin';
  const adminPassword = 'admin123';
  
  try {
    const existingAdmin = await db.users.where('username').equals(adminUsername).first();
    if (!existingAdmin) {
      const hashedPassword = await hashPassword(adminPassword);
      await db.users.add({
        username: adminUsername,
        password: hashedPassword,
        isAdmin: true,
        createdAt: new Date().toISOString()
      });
      console.log('Default admin account created');
      console.log('Username: admin');
      console.log('Password: admin123');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

export const register = async (username, password) => {
  const existingUser = await db.users.where('username').equals(username).first();
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await hashPassword(password);
  return db.users.add({
    username,
    password: hashedPassword,
    isAdmin: false,
    createdAt: new Date().toISOString()
  });
};

export const login = async (username, password) => {
  const user = await db.users.where('username').equals(username).first();
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  return user;
};