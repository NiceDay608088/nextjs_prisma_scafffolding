import React from "react";
import apolloClient from "@/lib/apolloClient";

const OrderForm = () => {
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
    <div className="w-full h-full border-slate-100 border-2 rounded p-2">
      OrderForm
    </div>
  );
};

export default OrderForm;
