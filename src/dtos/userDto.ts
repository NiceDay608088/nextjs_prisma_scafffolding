interface UserCreateRequest {
  username: string;
  password: string;
}

interface UserUpdateRequest {
  id: number;
  username: string;
  password: string;
}

interface UserFilterRequest {
  username: string;
  currentPage: number;
}
interface UserDeleteRequest {
  username: string;
  currentPage: number;
  ids: number[];
}

interface UserResponse {
  id: number;
  username: string;
}
