"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/shared/ui";

import { useCreateTodoMutation } from "../api/use-create-mutation";
import { createTodoSchema, type CreateTodoValues } from "../model/schema";

export function CreateTodoForm() {
  const createTodoMutation = useCreateTodoMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoValues>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = handleSubmit((values) => {
    createTodoMutation.mutate(values.title, { onSuccess: () => reset() });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <Input placeholder="Add a new todo" {...register("title")} />
        <Button type="submit" disabled={createTodoMutation.isPending}>
          Add
        </Button>
      </div>
      {errors.title && (
        <p className="text-xs text-red-600">{errors.title.message}</p>
      )}
    </form>
  );
}
