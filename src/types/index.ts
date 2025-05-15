export interface User {
  id: string;
  email: string;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  userId: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
