'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Album } from "@/types/common";

const albumSchema = z.object({
  title: z.string().min(1, "Title is required"),
  userId: z.string().min(1, "User ID is required"),
});

type AlbumFormData = z.infer<typeof albumSchema>;

interface AlbumFormProps {
  album?: Album;
  onSubmit: (data: AlbumFormData) => Promise<void>;
}

export function AlbumForm({ album, onSubmit }: AlbumFormProps) {
  const form = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
    defaultValues: {
      title: album?.title || "",
      userId: album?.userId || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The title of your album
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The ID of the user who owns this album
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {album ? "Update Album" : "Create Album"}
        </Button>
      </form>
    </Form>
  );
}