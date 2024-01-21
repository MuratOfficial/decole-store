"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { CollectionColumn } from "./columns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: CollectionColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    // toast({ description: "Id Скопирован", variant: "default" });
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/admin/blog/${data.id}`);
      router.refresh();
      //   toast({ description: "Блог удален", variant: "default" });
    } catch (error) {
      //   toast({
      //     description: "Убедитесь что вы удалили все обьекты пользователя",
      //     variant: "destructive",
      //   });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className=" sr-only">Открыть меню</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/collection/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Обновить
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Скопировать Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
