import React from "react";
import { CollectionForm } from "./components/collection-form";
import prismadb from "@/lib/prismadb";

async function CollectionAddPage({
  params,
}: {
  params: {
    collectionId: string;
  };
}) {
  const collection = await prismadb.collection.findUnique({
    where: {
      id: params.collectionId,
    },
  });
  return (
    <div className="w-full py-4 px-6 items-center flex flex-col">
      <CollectionForm initialData={collection} />
    </div>
  );
}

export default CollectionAddPage;
