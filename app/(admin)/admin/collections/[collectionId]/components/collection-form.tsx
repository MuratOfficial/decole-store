"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Collection } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2),
});

type CollectionFormValues = z.infer<typeof formSchema>;

interface CollectionFormProps {
  initialData: Collection | null;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Настроить коллекцию" : "Создать коллекцию";
  const description = initialData
    ? "Настройка коллекции."
    : "Добавление новой коллекции";
  const toastMessage = initialData
    ? "Коллекция обновлена."
    : "Коллекция создана.";
  const action = initialData ? "Сохранить изменения" : "Создать";

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: CollectionFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/collections/${params.collectionId}`, data);
      } else {
        await axios.post(`/api/collections`, data);
      }
      router.refresh();
      router.push(`/admin/collections`);
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
      await axios.delete(`/api/collections/${params.collectionId}`);
      router.refresh();
      router.push(`/admin/collections`);
      toast.success("Коллекция удалена.");
    } catch (error: any) {
      toast.error("Убедитесь что вы удалили внутри коллекции");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div className=" items-center  w-full grid grid-flow-row grid-cols-3 py-2">
        <div className="col-span-1">
          <Link
            href="/admin/collections"
            className="items-center w-fit text-sm text-center rounded-md bg-slate-300 px-2 py-2 flex flex-row gap-2 transition delay-150 duration-500 justify-center hover:bg-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Назад
          </Link>
        </div>

        <Heading title={title} description={description} />
        <div className="col-span-1">
          {initialData && (
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full py-2"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название коллекции</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Название коллекции"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
