
'use client';

import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  userData: any | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null, loading: true, userData: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          // Create a new user document if it doesn't exist
          const newUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'Hobbyist',
            photoURL: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
            hobbies: [],
            communities: [],
          };
          await setDoc(userDocRef, newUser);
          setUserData(newUser);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading, userData };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
