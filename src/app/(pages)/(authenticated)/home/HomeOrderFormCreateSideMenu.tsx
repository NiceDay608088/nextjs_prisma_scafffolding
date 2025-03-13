import { HookErrorMessage } from "@/components/ErrorMessage";
import SideMenu from "@/components/SideMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  createOrderFormType,
  createOrderSchema,
} from "@/formSchemas/OrderSchema";
import { CATEGORIES_OPTIONS } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

interface OrderCreateSideMenuProp {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
}

const defaultValues = {
  name: "",
  amount: 0,
  categories: [],
  labels: [],
};

const HomeOrderFormCreateSideMenu = ({
  isOpen,
  onSave,
  onClose,
}: OrderCreateSideMenuProp) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
    watch,
  } = useForm<createOrderFormType>({
    resolver: zodResolver(createOrderSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });

  const handleCancel = () => {
    clearAll();
    onClose();
  };

  const onSubmit = (values: createOrderFormType) => {
    clearAll();
    onSave();
  };

  const clearAll = () => {
    reset({ ...defaultValues }, { keepErrors: false });
    clearErrors();
  };

  console.log("HomeOrderFormCreateSideMenu Errors:", errors);

  return (
    <SideMenu isOpen={isOpen} className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-3">
            <div>
              <div className=" text-sm font-medium mb-1">Name</div>
              <Input {...register("name")} />
              <HookErrorMessage error={errors?.name} />
            </div>
            <div>
              <div className=" text-sm font-medium mb-1">Categories</div>
              <MultiSelect
                {...register("categories")}
                options={CATEGORIES_OPTIONS}
                onValueChange={() => {}}
              />
              <HookErrorMessage error={errors?.categories} />
            </div>
            <div>
              <div className=" text-sm font-medium mb-1">Amount</div>
              <Input
                {...register("amount", {
                  setValueAs: (value) => (value ? parseFloat(value) : 0),
                })}
                type="number"
              />
              <HookErrorMessage error={errors?.amount} />
            </div>
            <div>
              <div className=" text-sm font-medium mb-1">Labels</div>
              <Input {...register("labels")} />
              <HookErrorMessage error={errors?.labels} />
            </div>
          </div>
          <div className="flex items-center justify-between px-4">
            <Button className="px-6 py-2">Save</Button>
            <Button className="px-5 py-2" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </SideMenu>
  );
};

export default HomeOrderFormCreateSideMenu;
