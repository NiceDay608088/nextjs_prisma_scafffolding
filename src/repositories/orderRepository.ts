import { RECORD_PER_PAGE } from "@/utils/constants";
import prisma from "@/lib/prisma";
import {
  OrderCreateRequest,
  OrderDeleteRequest,
  OrderUpdateRequest,
} from "@/dtos/orderDto";

export const createOrderRepo = async (request: OrderCreateRequest) => {
  const order = await prisma.order.create({ data: request });
  return order;
};

export const editOrderRepo = async (request: OrderUpdateRequest) => {
  const order = await prisma.order.update({
    where: { id: request.id, isDeleted: false },
    data: request,
  });
  return order;
};

export const deleteOrderRepo = async (request: OrderDeleteRequest) => {
  const deletedUsers = await prisma.user.updateMany({
    where: {
      id: { in: request.ids },
    },
    data: {
      isDeleted: true,
    },
  });
  return deletedUsers;
};

// export const editOrderRepo = async (request: OrderUpdateRequest) => {
//   const updatedUser = await prisma.user.update({
//     where: {
//       id: Number(request.id),
//     },
//     data: {
//       username: request.username,
//       password: await encrypt(request.password),
//     },
//   });
//   return updatedUser;
// };
