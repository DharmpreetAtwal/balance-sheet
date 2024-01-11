import { useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useUserInfo } from "./useUserInfo";
import { db } from "../config/firebase";

export const useGetEntries = () => {
  const [entries, setEntries] = useState([]);
  const [income, setIncome] = useState(0.0);
  const [expense, setExpense] = useState(0.0);
  const [balance, setBalance] = useState(0.0);

  const { userID } = useUserInfo();

  const entryCollectionRef = collection(db, "entries");

  const getEntries = async () => {
    let unsub;
    try {
      const queryEntries = query(
        entryCollectionRef,
        where("userID", "==", userID),
        orderBy("created")
      );

      unsub = onSnapshot(queryEntries, (snap) => {
        let incomeTotal = 0;
        let expenseTotal = 0;
        let docs = [];

        snap.forEach((doc) => {
          const id = doc.id;
          const entry = doc.data();

          if (entry.entryType === "expense") {
            expenseTotal += Number(entry.entryAmount);
          } else {
            incomeTotal += Number(entry.entryAmount);
          }

          docs.push({ ...entry, id });
        });

        setEntries(docs);
        setIncome(incomeTotal);
        setExpense(expenseTotal);
        setBalance(incomeTotal - expenseTotal);
      });
    } catch (error) {
      console.error(error);
    }

    return () => unsub();
  };

  useEffect(() => {
    getEntries();
  }, []);

  return { entries, income, expense, balance };
};
