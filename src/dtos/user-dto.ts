interface UserCreateRequest {
  username: string;
  password: string;
}

interface UserUpdateRequest {
  id: number;
  username: string;
  password: string;
}

interface UserResponse {
  id: number;
  username: string;
}
