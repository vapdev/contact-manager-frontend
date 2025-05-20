export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Contact {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  userId: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
