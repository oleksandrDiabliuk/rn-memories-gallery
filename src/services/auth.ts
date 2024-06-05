import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { authentication } from './config';

export const signup = async (email: string, password: string) => {
  try {
    const {user} = await createUserWithEmailAndPassword(authentication, email, password);

    return user;
  } catch(error) {
    throw error;
  }
};

export const signin = async (email: string, password: string) => {
  try {
    const {user} = await signInWithEmailAndPassword(authentication, email, password);

    return user;
  } catch(error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(authentication);
  } catch(error) {
    throw error;
  }
};
