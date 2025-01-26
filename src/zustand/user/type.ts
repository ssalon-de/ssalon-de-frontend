import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

import { type User as QueryUser } from "@/queries/auth/type";

export type User = QueryUser;

export interface UserStates {
  user: User;
}

export interface UserActions {
  setUser: (user: User) => void;
}

export type UserPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStates>
) => StateCreator<UserStore>;

export interface UserStore extends UserStates, UserActions {}
