import React from "react";
import UserForm from "./HomeUserForm";
import OrderForm from "./HomeOrderForm";

const HomePage = () => {
  return (
    <div className="flex h-full p-6 gap-6">
      <UserForm />
      <OrderForm />
    </div>
  );
};

export default HomePage;
