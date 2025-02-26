"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage, HookErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/Toast";
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
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
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
    const { confirmPassword, ...mutationVariables } = values;
    console.log(mutationVariables);
    try {
      const response: any = await postRequest("/user/register", {
        ...mutationVariables,
      });
      showToast({ message: "Success", type: "success" });
      console.log(".....", response.id);
      setError("");
    } catch (error: any) {
      showToast({ message: "Error", type: "error" });
      setError(error.message);
      console.log(".....", error);
    } finally {
      reset();
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
      <ErrorMessage message={error} />
    </form>
  );
};

export default RegisterForm;
