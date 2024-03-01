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
  let collection;

  if (params.collectionId === "new") {
    collection = null;
  } else {
    collection = await prismadb.collection.findUnique({
      where: {
        id: params.collectionId,
      },
    });
  }

  return (
    <div className="w-full py-4 px-6 items-center flex flex-col">
      <CollectionForm initialData={collection} />
    </div>
  );
}

export default CollectionAddPage;
