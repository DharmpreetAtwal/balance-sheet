import { useState } from "react";
import { useAddEntry } from "../../hooks/useAddEntry";
import { useGetEntries } from "../../hooks/useGetEntries";
import { useUserInfo } from "../../hooks/useUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const BalanceSheet = () => {
  const [description, setDescription] = useState("");
  const [entryAmount, setEntryAmount] = useState(0);
  const [entryType, setEntryType] = useState("expense");

  const { addEntry } = useAddEntry();
  const { entries, income, expense, balance } = useGetEntries();
  const { name, profilePhoto } = useUserInfo();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    addEntry({
      description,
      entryAmount,
      entryType,
    });
    setDescription("");
    setEntryAmount(0);
    setEntryType("expense");
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {profilePhoto && (
        <div>
          <img src={profilePhoto}></img>
          <button onClick={signOutUser}> Sign Out </button>
        </div>
      )}
      <div>
        <div>
          <h1> {name}'s Balance Sheet </h1>
          <div>
            <h3> Balance: </h3>
            {balance >= 0 ? <h2> ${balance} </h2> : <h2> -${balance * -1} </h2>}
          </div>
          <div>
            <div>
              <h3> Income: </h3>
              <p> ${income} </p>
            </div>
            <div>
              <h3> Expense: </h3>
              <p> ${expense} </p>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Desc."
              required
              value={description}
            />
            <input
              onChange={(e) => setEntryAmount(e.target.value)}
              type="number"
              placeholder="Amount."
              required
              value={entryAmount}
            />

            <label htmlFor="income">Income:</label>
            <input
              onChange={(e) => setEntryType(e.target.value)}
              type="radio"
              id="income"
              value="income"
              checked={entryType == "income"}
            />
            <label htmlFor="expense">Expense:</label>
            <input
              onChange={(e) => setEntryType(e.target.value)}
              type="radio"
              id="expense"
              value="expense"
              checked={entryType == "expense"}
            />

            <button> Add Entry </button>
          </form>
        </div>
      </div>

      <div>
        <h2>Entries: </h2>
        <ul>
          {entries.map((entry) => {
            const { description, entryAmount, entryType } = entry;
            return (
              <li>
                <h3> {description} </h3>
                <p>
                  {" "}
                  ${entryAmount} |{" "}
                  <label
                    style={{ color: entryType === "income" ? "green" : "red" }}
                  >
                    {entryType}
                  </label>{" "}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
