"use client";
import Container from "../shared-components/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import {
  Form,
  FormControl,
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
import { Button } from "@/components/ui/button";
import { newsLetterSchema } from "@/lib/form-schema";

export default function SignUp() {
  const form = useForm<z.infer<typeof newsLetterSchema>>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      name: "",
      email: "",
      option: "",
    },
  });

  return (
    <Container
      id="sign-up"
      variant="rounded-primary"
      innerClassName="p-0 md:p-0 grid grid-cols-1  lg:grid-cols-[2fr_1fr] gap-4 border-2 items-center bg-white"
    >
      <div className="flex flex-col  justify-center gap-2 py-10 px-10 text-[#2d234b]">
        <h1 className="font-medium capitalize text-2xl sm:text-3xl lg:text-4xl leading-6 mb-4">
          Sign-up for updates
        </h1>
        <p>
          To receive updates about our latest programs, reports, campaigns and
          webinars,etc.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              console.log(values);
            })}
            className="grid grid-cols-1 gap-4 items-end sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>

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
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="option"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How did you hear about us?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="text-secondary font-medium">
                      <SelectTrigger className="">
                        <SelectValue placeholder="Please choose one option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"Friends and family"}>
                        Friends and family
                      </SelectItem>
                      <SelectItem value={"Youtube"}>Youtube</SelectItem>
                      <SelectItem value={"Social media"}>
                        Social media
                      </SelectItem>
                      <SelectItem value={"One of our programs or events"}>
                        One of our programs or events
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-[#2d234b] hover:bg-[#2d234b]/90"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>

      <div className="relative inset-0 w-full h-full bg-shade opacity-60 ">
        <Image
          src="/img/gallery/activities.jpg"
          alt="activities"
          width={500}
          height={500}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover brightness-110"
        />
      </div>
    </Container>
  );
}
