"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";
import { Collection } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2),
  heading1: z.string(),
  description1: z.string(),
  heading2: z.string(),
  description2: z.string(),
  heading3: z.string(),
  description3: z.string(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Collection | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Настроить подкатегорию" : "Создать подкатегорию";
  const description = initialData
    ? "Настройка подкатегории."
    : "Добавление новой подкатегории";
  const toastMessage = initialData
    ? "Подкатегория обновлена."
    : "Подкатегория создана.";
  const action = initialData ? "Сохранить изменения" : "Создать";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      heading1: "",
      description1: "",
      heading2: "",
      description2: "",
      heading3: "",
      description3: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/admin/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Что-то пошло не так ...");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Подкатегория удалена.");
    } catch (error: any) {
      toast.error("Убедитесь что вы удалили внутри подкатегорий");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return <div>NewForm</div>;
};
