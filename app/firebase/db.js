import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaP7y26sdEIIQwTHAvEFLxC8lSiGo7J_g",
  authDomain: "protemplo-e8571.firebaseapp.com",
  projectId: "protemplo-e8571",
  storageBucket: "protemplo-e8571.appspot.com",
  messagingSenderId: "636363099026",
  appId: "1:636363099026:web:4e5f055015c6fdb2b58f4b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export async function uploadFile(file, valorqr) {
  try {
    console.log(storage);
    const storageRef = ref(storage, valorqr);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
