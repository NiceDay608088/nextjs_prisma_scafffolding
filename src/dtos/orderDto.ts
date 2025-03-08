export interface OrderCreateRequest {
  name: string;
  amount: number;
  category: string;
  labels: [];
  metadata: {};
  userId: number;
}

export interface OrderUpdateRequest {
  id: number;
  name: string;
  amount: number;
  category: string;
  labels: string[];
  metadata?: {};
}

export interface OrderDeleteRequest {
  ids: number[];
}

export interface OrderFilterRequest {
  name: string;
  minAmount?: number;
  maxAmount?: number;
  category?: string;
  labels: string[];
  currentPage: number;
}

export interface OrderDetailResponse {
  id: number;
  name: string;
  amount: number;
  category: string;
  labels: string[];
}

export interface OrderPagingResponse {
  currentPage: number;
  totalRecord: number;
  totalPages: number;
  orders: OrderDetailResponse[];
}
