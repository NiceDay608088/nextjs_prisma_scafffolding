"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage, HookErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/utils/request-util";

const registerSchema = z
  .object({
    username: z.string().nonempty("Username is required."),
    password: z.string().nonempty("Password is required."),
    confirmPassword: z.string().nonempty("Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password doesn't match Password.",
    path: ["confirmPassword"],
  });

type RegisterFormType = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormType) {
    try {
      const data = await postRequest("/users", { ...values });
      console.log("Success:", data);
    } catch (err: any) {
      console.log("Error:", err);
      setErrorMessage(err.message || "An error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register("username")} />
      </div>
      <HookErrorMessage error={errors.username} />

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" {...register("password")} type="password" />
      </div>
      <HookErrorMessage error={errors.password} />

      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
        />
      </div>
      <HookErrorMessage error={errors.confirmPassword} />

      <Button>Register</Button>
      <ErrorMessage message={errorMessage} />
    </form>
  );
};

export default RegisterForm;
