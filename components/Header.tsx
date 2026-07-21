import React from "react";
import LogOutButton from "./LogOutButton";

function Header() {
  return (
    <nav className="flex w-full space-between sticky top-0 p-5 bg-zinc-100 dark:bg-black border-b border-zinc-300">
      <LogOutButton />
    </nav>
  );
}

export default Header;
