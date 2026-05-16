import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// Generic CRUD helpers
export const subscribeToCollection = (collectionName: string, callback: (data: any[]) => void, orderField = 'createdAt', additionalQuery?: any) => {
  let q = query(collection(db, collectionName), orderBy(orderField, 'desc'));
  if (additionalQuery) {
    q = query(collection(db, collectionName), additionalQuery, orderBy(orderField, 'desc'));
  }
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const subscribeToCollectionWithFilter = (collectionName: string, filterField: string, filterValue: string, callback: (data: any[]) => void) => {
  const q = query(collection(db, collectionName), where(filterField, '==', filterValue), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const createDocument = (collectionName: string, data: any) => {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date().toISOString()
  });
};

export const updateDocument = (collectionName: string, id: string, data: any) => {
  return updateDoc(doc(db, collectionName, id), data);
};

export const deleteDocument = (collectionName: string, id: string) => {
  return deleteDoc(doc(db, collectionName, id));
};
