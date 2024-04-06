"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Loader2, Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";

const userFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Логин должен быть не меньше 2 значении.",
    })
    .max(30, {
      message: "Логин должен быть не больше 30 значении.",
    }),
  password: z.string().min(2, {
    message: "Пароль должен быть не меньше 2 значении.",
  }),
  email: z
    .string({
      required_error: "Пожалуйста, выберите email.",
    })
    .email(),
  phone: z
    .string()
    .refine((data) => /^\+?\d+$/.test(data), {
      message: "Укажите правильный номер телефона",
    })
    .optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  initialData: User | null;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData || {
      username: "",
      phone: "",

      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/users/${params.userId}`, data);
        toast.success("Пользователь обновлен");
      } else {
        await axios.post(`/api/users`, data);
        toast.success("Пользователь добавлен");
      }

      router.refresh();
      router.push(`/admin/users`);
    } catch (error: any) {
      toast.error("Что-то пошло не так ...");
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/users/${params.userId}`);
      router.refresh();
      router.push(`/admin/users`);
      toast.success("Успешно удален");
    } catch (error: any) {
      toast.error("Что-то пошло не так ...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Создание/Обновление пользователя"
          description="Заполните поля ниже"
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(true);
              onDelete();
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-flow-row grid-cols-2 gap-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input placeholder="login" {...field} />
                </FormControl>
                <FormDescription>
                  Это ваш логин, по которому вы идентифицируетесь в системе
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input placeholder="Пароль" {...field} />
                </FormControl>
                <FormDescription>
                  Это ваш пароль, для входа в систему
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="login@example.com" {...field} />
                </FormControl>

                <FormDescription>
                  Вы можете изменить свою почту корректировав здесь
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                  <Input placeholder="+ 7 777 777 77 77" {...field} />
                </FormControl>

                <FormDescription>
                  Вы можете скорректировать свой номер
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Дата регистрации</FormLabel>

            <FormDescription>
              {format(initialData?.createdAt || currentDate, "PPP", {
                locale: ru,
              })}
            </FormDescription>
            <FormMessage />
          </FormItem>
          <Button disabled={loading} type="submit">
            {loading && <Loader2 className="w-4 animate-spin mr-2" />}
            Создать/обновить пользователя
          </Button>
        </form>
      </Form>
    </>
  );
};
