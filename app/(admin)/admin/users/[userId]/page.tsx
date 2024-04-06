import React from "react";
import prismadb from "@/lib/prismadb";
import { UserForm } from "./components/userForm";

const UserAddUpdatePage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  let user;

  if (params.userId === "new") {
    user = null;
  } else {
    user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  );
};

export default UserAddUpdatePage;
