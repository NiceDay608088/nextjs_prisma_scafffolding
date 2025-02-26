import {
  createOrder,
  //   deleteOrder,
  //   getOrderByFilter,
  //   getOrderById,
  //   updateOrder,
} from "@/services/orderService";
import { X_USER_ID } from "@/utils/constants";

export const orderResolvers = {
  //   Query: {
  //     getOrderById: (_: any, { id }: { id: number }) => {
  //       console.log("getOrderById", { id });
  //       const order = getOrderById(id);
  //       return { id: 1, name: "", amount: "" };
  //     },
  //     getOrderByFilter: (
  //       _: any,
  //       {
  //         name,
  //         amountMin,
  //         amountMax,
  //         currentPage,
  //       }: {
  //         name: string;
  //         amountMin: number;
  //         amountMax: number;
  //         currentPage: number;
  //       }
  //     ) => {
  //       console.log("getOrderByFilter", {
  //         name,
  //         amountMin,
  //         amountMax,
  //         currentPage,
  //       });
  //       const order = getOrderByFilter({
  //         name,
  //         amountMin,
  //         amountMax,
  //         currentPage,
  //       });
  //       return { username: "test", id: "1" };
  //     },
  //   },
  Mutation: {
    createOrder: async (
      _: any,
      {
        name,
        amount,
        category,
        labels,
        metadata,
      }: {
        name: string;
        amount: number;
        category: string;
        labels: string[];
        metadata: {};
      },
      context: any
    ) => {
      const userId = Number(context.headers[X_USER_ID]);
      console.log("createOrder", {
        name,
        amount,
        category,
        labels,
        metadata,
        userId,
      });
      const order = await createOrder({
        name,
        amount,
        category,
        metadata,
        userId,
      });
      return { id: order.id };
    },
    // updateOrder: async (
    //   _: any,
    //   { id, name, amount }: { id: number; name: string; amount: number }
    // ) => {
    //   //   const order = await updateOrder({ id, name, amount });
    //   return { id: order.id };
    // },
    // deleteOrder: async (_: any, { id }: { id: number }) => {
    //   //   const order = await deleteOrder(id);
    //   return { id: order.id };
    // },
  },
};
