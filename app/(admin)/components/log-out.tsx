"use client";
import { signOut } from "next-auth/react";
import React from "react";

function LogOut() {
  return (
    <button
      className=" text-sm hover:underline mt-2 underline-offset-4"
      onClick={() => signOut()}
    >
      Выйти
    </button>
  );
}

export default LogOut;
