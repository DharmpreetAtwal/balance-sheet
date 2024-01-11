import { auth, googleAuthProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useEffect } from "react";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useUserInfo();

  const signInGoogle = async () => {
    const results = await signInWithPopup(auth, googleAuthProvider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/balance-sheet");
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/balance-sheet");
    }
  }, []);

  return (
    <div className="login-page">
      <button onClick={signInGoogle}> Google Sign In </button>
    </div>
  );
};
