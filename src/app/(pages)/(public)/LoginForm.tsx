"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, HookErrorMessage } from "@/components/ErrorMessage";
import { postRequest } from "@/utils/request-util";

const loginsSchema = z.object({
  username: z.string().nonempty("Username is required."),
  password: z.string().nonempty("Password is required."),
});

type LoginFormType = z.infer<typeof loginsSchema>;

const LoginForm = () => {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginsSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormType) {
    try {
      const data = await postRequest("/user/login", { ...values });
      console.log(".....", data);
    } catch (err: any) {
      setError(err.message);
      console.log(".....", err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register("username")} />
      </div>
      <HookErrorMessage error={errors.username} />

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" {...register("password")} type="password" />
      </div>
      <HookErrorMessage error={errors.password} />

      <Button>Login</Button>
      <ErrorMessage message={error} />
    </form>
  );
};

export default LoginForm;
