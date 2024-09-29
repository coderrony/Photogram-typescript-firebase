import { db } from '@/firebaseConfig';
import { ProfileResponse, UserProfile } from '@/types';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'users';

export const createUserProfile = (user: UserProfile) => {
  try {
    return addDoc(collection(db, COLLECTION_NAME), user);
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
    );
    const querySnapshot = await getDocs(q);
    let tempData = {};
    if (querySnapshot.size > 0) {
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        tempData = {
          id: doc.id,
          ...userData,
        };
      });
      return tempData;
    } else {
      console.log('No such document');
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUserProfile = async (id: string, user: UserProfile) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, {
    ...user,
  });
};

export const getAllUsers = async (userId: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const temArr: ProfileResponse[] = [];
    if (querySnapshot.size > 0) {
      querySnapshot.forEach(document => {
        const userData = document.data() as UserProfile;
        console.log('user data', userData);

        const resObj: ProfileResponse = {
          ...userData,
          id: document.id,
        };
        temArr.push(resObj);
      });
      return temArr.filter(item => item.userId !== userId);
    } else {
      console.log('no such document');

      return null;
    }
  } catch (err) {
    console.log(err);
  }
};
