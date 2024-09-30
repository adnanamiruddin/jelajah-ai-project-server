import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export collections/tables
export const UsersTable = collection(db, "users");
export const ToolsTable = collection(db, "tools");
export const TagsTable = collection(db, "tags");
export const ToolTagsTable = collection(db, "tool_tags");
export const ToolUserProfilesTable = collection(db, "tool_user_profiles");
