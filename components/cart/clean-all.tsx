import useBaskets from "@/hooks/useBasket";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Trash2 } from "lucide-react";

export default function CleanAll({ className }: { className?: string }) {
  const allClean = useBaskets().removeAllItems;

  return (
    <button
      onClick={() => allClean()}
      className="relative flex-row gap-x-1 hover:border-neutral-400 flex py-1 px-2 items-center justify-center rounded-md border border-neutral-200 hover:text-black text-neutral-600 transition-colors dark:border-neutral-700 dark:text-white"
    >
      <Trash2 className="w-4" /> Зачистить
    </button>
  );
}
