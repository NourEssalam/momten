import { z } from "zod";

export const newsLetterSchema = z.object({
  name: z.string().trim().min(3, { message: "Please enter your name." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Please enter your email address." }),
  option: z.string().min(1, { message: "Please choose one option." }),
});

export const contactSchema = z.object({
  name: z.string().trim().min(3, { message: "Please enter your name." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(1, { message: "Please enter your email address." }),
  message: z
    .string()
    .min(10, {
      message: "Please enter a message with at least 10 characters.",
    }),
});
