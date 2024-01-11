import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useUserInfo } from "./useUserInfo";

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
