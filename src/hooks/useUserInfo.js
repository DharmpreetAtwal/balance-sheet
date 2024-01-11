import React from "react";

export const useUserInfo = () => {
  const { name, profilePhoto, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};
  return { name, profilePhoto, userID, isAuth };
};
