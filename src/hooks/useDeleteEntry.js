import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const useDeleteEntry = () => {
  const deleteEntry = async (id) => {
    const removeDoc = doc(db, "entries", id);
    await deleteDoc(removeDoc);
  };

  return { deleteEntry };
};
