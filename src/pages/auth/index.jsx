import { auth, googleAuthProvider } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useEffect } from "react";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useUserInfo();

  const signInGoogle = async () => {
    const res = await signInWithPopup(auth, googleAuthProvider);
    const info = {
      userID: res.user.uid,
      name: res.user.displayName,
      profilePhoto: res.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(info));
    navigate("/balance-sheet");
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/balance-sheet");
    }
  }, []);

  return (
    <div className="flex bg-slate-500 h-screen">
      <div className="m-auto">
        <div className="flex flex-col h-1/6 items-center space-y-3">
          <div>
            <h1 className="text-8xl px-8 rounded-3xl bg-orange-500 text-white">
              {" "}
              Balance Sheet{" "}
            </h1>
          </div>
          <div>
            <h2 className="text-2xl px-4 py-2 rounded-3xl text-white bg-purple-700">
              {" "}
              GitHub:{" "}
              <a
                className="text-blue-400 underline"
                href="https://github.com/DharmpreetAtwal/"
              >
                {" "}
                DharmpreetAtwal{" "}
              </a>{" "}
            </h2>
          </div>

          <div>
            <h1 className="bg-red-500 rounded-2xl text-white text-center p-2 text-4xl">
              {" "}
              Please sign into your google account{" "}
            </h1>
          </div>

          <div>
            <button
              className="bg-green-500 text-white text-xl w-40 h-10 round rounded-lg"
              onClick={signInGoogle}
            >
              {" "}
              Sign In Google{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
