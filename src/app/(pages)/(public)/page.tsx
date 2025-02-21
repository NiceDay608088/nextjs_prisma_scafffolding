import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const HomePage = () => {
  return (
    <div className="h-screen flex mt-32 justify-center">
      <Tabs defaultValue="tab_login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tab_login">Login</TabsTrigger>
          <TabsTrigger value="tab_register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="tab_login">
          <Card>
            <CardHeader>
              <CardTitle>Login Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tab_register">
          <Card>
            <CardHeader>
              <CardTitle>Register Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <RegisterForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
