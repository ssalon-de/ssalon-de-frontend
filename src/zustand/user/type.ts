import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

export type User = {
  email: string;
};

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
