export interface LoginDOT {
  username: string;
  password: string;
}

export interface RegisterDOT {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  created_at?: string;
}
