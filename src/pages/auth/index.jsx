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
    <div>
      <h1> Please sign into your google account </h1>
      <button onClick={signInGoogle}> Google Sign In </button>
    </div>
  );
};
