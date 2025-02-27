"use client";

import React, { useEffect, useState } from "react";
import apolloClient from "@/lib/apolloClient";
import { MultiSelect } from "@/components/ui/multi-select";
import { Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HomeOrderFilterType {
  name: string;
  category: string[];
  labels: string[];
  maxAmount: number;
  minAmount: number;
}

const categories = [
  { value: "phone", label: "Phone" },
  { value: "car", label: "Car" },
];

const OrderForm = () => {
  const [filter, setFilter] = useState<HomeOrderFilterType>({
    name: "",
    category: [],
    labels: [],
    maxAmount: -1,
    minAmount: -1,
  });

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  // const { confirmPassword, ...mutationVariables } = values;
  // console.log(mutationVariables);
  // try {
  //   const response: any = await apolloClient.mutate({
  //     mutation: CREATE_USER,
  //     variables: { ...mutationVariables },
  //   });
  //   showToast({ message: "Success", type: "success" });
  //   console.log(".....", response.data.createUser);
  // } catch (error: any) {
  //   showToast({ message: "Error", type: "error" });
  //   setError(error.message);
  //   console.log(".....", error);
  // } finally {
  //   reset();
  // }

  return (
    <div className="w-full h-full flex flex-col gap-8 border-slate-100 border-2 rounded p-6">
      <div className="flex items-center gap-2 text-slate-700">
        <Menu size={20} /> <span className="text-lg">Orders</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div className="w-32">Name:</div>
          <div className="flex-1">
            <Input
              value={filter.name}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-32">Categories:</div>
          <div className="flex-1">
            <MultiSelect
              options={categories}
              onValueChange={(e) =>
                setFilter((prev) => ({ ...prev, category: e }))
              }
              defaultValue={filter.category}
              placeholder="Select Category"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-32">Amount:</div>
          <div className="flex-1">
            <div className="flex items-center">
              <div className="flex-1">
                <Input placeholder="min" />
              </div>
              <div className="w-10 text-center"> - </div>
              <div className="flex-1">
                <Input placeholder="max" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>a</div>
    </div>
  );
};

export default OrderForm;
