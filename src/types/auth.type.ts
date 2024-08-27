export type TLoginUserData = {
  email: string;
  password: string;
};

export type TRegisterUserData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin";
  address: string;
};
export type TUserData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin";
  address: string;
};
