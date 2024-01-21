"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Collection, Image, Product } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/ui/image-upload";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2),
  images: z.object({ url: z.string() }).array(),

  availableForSale: z.boolean().default(true).optional(),
  description: z.string().optional(),
  option1: z.string().optional(),
  option2: z.string().optional(),
  option3: z.string().optional(),
  price: z.string().min(2),
  color1: z.string().optional(),
  color2: z.string().optional(),
  color3: z.string().optional(),
  collectionId: z.string().min(2),
  tags: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  collections: Collection[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  collections,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Настроить продукт" : "Создать продукт";
  const description = initialData
    ? "Настройка продукта."
    : "Добавление нового продукта";
  const toastMessage = initialData ? "Продукт обновлена." : "Продукт создана.";
  const action = initialData ? "Сохранить изменения" : "Создать";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      availableForSale: true,
      images: [],
      title: "",
      description: "",
      option1: "",
      option2: "",
      option3: "",
      price: "",
      color1: "",
      color2: "",
      color3: "",
      collectionId: "",
      tags: "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/products/${params.productId}`, data);
      } else {
        await axios.post(`/api/products`, data);
      }
      router.refresh();
      router.push(`/admin/products`);
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
      await axios.delete(`/api/products/${params.productId}`);
      router.refresh();
      router.push(`/admin/products`);
      toast.success("Продукт удален.");
    } catch (error: any) {
      toast.error("Что-то пошло не так...");
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
            href="/admin/products"
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название продукта</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Название продукта"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableForSale"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>К продаже</FormLabel>
                    <FormDescription>
                      Этот продукт будет показан
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Коллекция</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Выберите коллекцию"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {collections.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Изображения</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value?.map((image) => image.url)}
                      disabled={loading}
                      onChange={(url) =>
                        field.onChange([...field.value, { url }])
                      }
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.url !== url
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Напишите описание"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Цена" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Размер 1</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="12х15мм"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Размер 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="12х15мм"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="option3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Размер 3</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="12х15мм"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цвет 1</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="красный"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цвет 2</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="зеленый"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цвет 3</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="красный"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Теги</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="цепи, бисеры,"
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
