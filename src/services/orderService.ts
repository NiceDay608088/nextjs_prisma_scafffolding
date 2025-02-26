import {
  OrderCreateRequest,
  OrderDetailResponse,
  OrderFilterRequest,
  OrderPagingResponse,
  OrderUpdateRequest,
} from "@/dtos/orderDto";

export const createOrder = async (request: OrderCreateRequest) => {
  const order = await createOrderRepo(request);
  return order;
};

// export const updateOrder = async (request: OrderUpdateRequest) => {
//   const order = await updateOrderRepo({});
//   return order;
// };

// export const deleteOrder = async (id: number) => {
//   const order = await deleteOrderRepo({});
//   return order;
// };

// export const getOrderById = async (
//   id: number
// ): Promise<OrderDetailResponse> => {
//   const order = await getOrderByIdRepo({});
//   return order;
// };

// export const getOrderByFilter = async (
//   request: OrderFilterRequest
// ): Promise<OrderPagingResponse> => {
//   const order = await getOrderByFilterRepo({});
//   return order;
// };
