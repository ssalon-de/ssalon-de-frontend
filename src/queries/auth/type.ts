export type AuthDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  users: {
    email: string;
  };
};

export type User = {
  email: string;
  name: string;
  company: string;
  createdAt: string;
};

export type SignUpDTO = {
  email: string;
  name: string;
  company: string;
  password: string;
  // confirmPassword: string;
};
