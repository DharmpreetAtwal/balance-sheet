import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { useUserInfo } from "./useUserInfo";
import { db } from "../config/firebase";

export const useAddEntry = () => {
  const entryCollectionRef = collection(db, "entries");
  const { userID } = useUserInfo();

  const addEntry = async ({ description, entryAmount, entryType }) => {
    await addDoc(entryCollectionRef, {
      userID,
      description,
      entryAmount,
      entryType,
      created: serverTimestamp(),
    });
  };

  return { addEntry };
};
