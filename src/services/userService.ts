import { auth, db } from '../config/firebase.ts';
import type { UserRequest, LoginResponse } from '../types/user.ts';
import dotenv from 'dotenv';
dotenv.config();

export const createUser = async (userData: UserRequest) => {
    const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.name,
    });

    // Optionally save user data to Firestore
    await db.collection('users').doc(userRecord.uid).set({
        email: userData.email,
        name: userData.name,
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

export const loginUser = async (userData: UserRequest): Promise<LoginResponse> => {
    const API_KEY = process.env.FIREBASE_API_KEY;
    if (!API_KEY) {
        throw new Error('FIREBASE_API_KEY is not defined in environment variables');
    }

    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                returnSecureToken: true,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error('Firebase Auth Error:', data.error);
        throw new Error(data.error?.message || 'Login failed');
    }

    return data as LoginResponse;
};

export const sendPasswordResetEmail = async (email: string): Promise<void> => {
    const API_KEY = process.env.FIREBASE_API_KEY;
    if (!API_KEY) {
        throw new Error('FIREBASE_API_KEY is not defined in environment variables');
    }

    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: email,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error('Firebase Auth Reset Error:', data.error);
        throw new Error(data.error?.message || 'Password reset request failed');
    }
};
