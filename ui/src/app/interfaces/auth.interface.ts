export interface RegisterData {
  username: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
} 