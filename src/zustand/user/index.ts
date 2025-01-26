import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserPersist } from "./type";

const key = "user-store";

export const initialUser: User = {
  email: "",
  name: "",
  company: "",
  createdAt: "",
};

const useUserStore = create(
  (persist as unknown as UserPersist)(
    (set) => ({
      user: initialUser,
      setUser: (user) => set({ user }),
    }),
    {
      name: key,
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;
