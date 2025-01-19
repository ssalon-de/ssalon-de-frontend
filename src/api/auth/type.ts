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
};
