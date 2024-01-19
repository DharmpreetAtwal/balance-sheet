import { useState } from "react";
import { useAddEntry } from "../../hooks/useAddEntry";
import { useGetEntries } from "../../hooks/useGetEntries";
import { useUserInfo } from "../../hooks/useUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useDeleteEntry } from "../../hooks/useDeleteEntry";

export const BalanceSheet = () => {
  const [description, setDescription] = useState("");
  const [entryAmount, setEntryAmount] = useState(0);
  const [entryType, setEntryType] = useState("expense");

  const { addEntry } = useAddEntry();
  const { deleteEntry } = useDeleteEntry();

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
    setEntryAmount(0);
    setDescription("");
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
      <header className="bg-green-300 min-h-min">
        {profilePhoto && (
          <div className="p-2">
            <div className="flex justify-between">
              <div className="w-10 h-10">
                <img className="rounded-full" src={profilePhoto}></img>
              </div>
              <div>
                <h1 className="bg-green-500 px-2 border-2 border-emerald-700  text-emerald-700 text-4xl font-bold">
                  {" "}
                  {name}'s Balance Sheet{" "}
                </h1>
              </div>
              <div>
                <button
                  className="bg-red-500 hover:bg-red-400 p-2 rounded-lg text-stone-100 drop-shadow-2xl"
                  onClick={signOutUser}
                >
                  {" "}
                  Sign Out{" "}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <div>
        <div className="bg-green-100">
          <div>
            <div className="flex items-center justify-center">
              <h3 className="text-2xl inline font-bold px-1"> Balance: </h3>
              {balance < 0 ? (
                <h2 className="text-red-500 text-4xl inline">
                  {" "}
                  -${balance * -1}{" "}
                </h2>
              ) : (
                <h2 className="text-green-500 text-4xl inline"> ${balance} </h2>
              )}
            </div>
            <div>
              <div>
                <div className="bg-gradient-to-r from-green-400 via-emerald-800 to-green-400 bg-center text-green-100 flex items-center justify-center text-2xl">
                  <h3 className="px-1"> Income: </h3>
                  <p className="font-bold"> ${income} </p>
                </div>

                <div className="bg-gradient-to-r from-red-400 via-red-800 to-red-400 bg-center text-red-100 flex items-center justify-center text-2xl">
                  <h3 className="px-1"> Expense: </h3>
                  <p className="font-bold"> ${expense} </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="bg-gradient-to-r from-slate-500 via-slate-800 to-slate-500 bg-center flex flex-col justify-center"
            >
              <div className="flex justify-center space-x-1">
                <input
                  className="bg-slate-300 border-slate-800 border-2"
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Desc."
                  required
                  value={description}
                />
                <input
                  className={`bg-slate-300 border-2 border-slate-800 text-${
                    entryType === "income" ? "green" : "red"
                  }-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  onChange={(e) => setEntryAmount(e.target.value)}
                  type="number"
                  placeholder="Amount."
                  required
                  value={entryAmount}
                />
              </div>

              <div className="flex justify-center p-2 space-x-10">
                <div className="bg-emerald-800 rounded-lg p-1 space-x-1">
                  <label className="text-green-100 text-xl" htmlFor="expense">
                    Income
                  </label>
                  <input
                    className="accent-green-100 border-green-100 w-5 h-5"
                    onChange={(e) => setEntryType(e.target.value)}
                    type="radio"
                    id="income"
                    value="income"
                    checked={entryType === "income"}
                  />
                </div>

                <div className="bg-red-800 rounded-lg p-1 space-x-1">
                  <label className="text-red-100 text-xl" htmlFor="expense">
                    Expense
                  </label>
                  <input
                    className="accent-red-100 border-red-100 w-5 h-5"
                    onChange={(e) => setEntryType(e.target.value)}
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={entryType === "expense"}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button className="bg-orange-500 mb-3 text-orange-100 max-w-24 max-h-20 hover:bg-orange-400 rounded-lg p-2">
                  {" "}
                  Add Entry{" "}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <h2 className="bg-slate-500 w-full text-center text-white text-3xl">
            Entries:{" "}
          </h2>
          <table className="border-2 w-full">
            <tbody>
              {entries.map((entry) => {
                const { description, entryAmount, entryType } = entry;
                return (
                  <tr
                    key={entry.id}
                    className={`border-2 bg-${
                      entryType === "income" ? "green" : "red"
                    }-500 text-white text-4xl`}
                  >
                    <td> {description} </td>
                    <td className="flex justify-between space-x-1">
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="bg-white text-red-500 w-5 ml-4 rounded-full"
                      >
                        X
                      </button>
                      <p>${entryAmount}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
