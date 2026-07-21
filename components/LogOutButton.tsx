import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

function LogOutButton() {
  const { logOut } = useAuth();
  const handleLogOut = async (e: any) => {
    e.preventDefault();
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      data-testid="logout-button"
      onClick={handleLogOut}
      className="p-2 bg-blue-500 text-white font-bold m-2 rounded-md hover:cursor-pointer"
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
