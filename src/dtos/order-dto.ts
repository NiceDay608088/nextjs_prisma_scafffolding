interface OrderCreateRequest {
  name: string;
  amount: number;
}

interface OrderUpdateRequest {
  name: string;
  amount: string;
}

interface UserResponse {
  id: number;
  name: string;
  amount: number;
}
