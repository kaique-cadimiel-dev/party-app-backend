import { auth, db } from '../config/firebase.ts';
import type { UserRequest } from '../types/user.ts';

export const createUser = async (userData: UserRequest) => {
    const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
    });

    // Optionally save user data to Firestore
    await db.collection('users').doc(userRecord.uid).set({
        email: userData.email,
        createdAt: new Date().toISOString(),
    });

    return userRecord;
};

export const getUserById = async (uid: string) => {
    const userRecord = await auth.getUser(uid);
    const userDoc = await db.collection('users').doc(uid).get();

    return {
        uid: userRecord.uid,
        email: userRecord.email,
        ...userDoc.data(),
    };
};
