'use client';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getSdks } from '..';

export async function handleEmailSignUp(auth: Auth, email: string, password: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  if (user) {
    const { firestore } = getSdks(auth.app);
    const userDocRef = doc(firestore, `users/${user.uid}`);
    await setDoc(userDocRef, {
      id: user.uid,
      email: user.email,
      name: user.displayName || user.email,
      createdAt: serverTimestamp(),
    });
  }
}

export async function handleEmailSignIn(auth: Auth, email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function handleGoogleSignIn(auth: Auth): Promise<void> {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
     if (user) {
        const { firestore } = getSdks(auth.app);
        const userDocRef = doc(firestore, `users/${user.uid}`);
        await setDoc(userDocRef, {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            createdAt: serverTimestamp(),
        }, { merge: true });
    }
}

export async function handleSignOut(auth: Auth): Promise<void> {
  await signOut(auth);
}
