export interface AuthPayload {
  token?: string | null;
  access_token?: string | null;
  user?: any;
  data?: any;
  userData?: any;
  [key: string]: any;
}

export interface AuthState {
  userData: any | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthAction {
  type: string;
  payload?: AuthPayload | any;
  error?: string | null;
  [key: string]: any;
}
