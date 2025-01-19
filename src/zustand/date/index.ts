import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DatePersist } from "./type";

const key = "date-store";

export const initialDate: Date = new Date();

const useDateStore = create(
  (persist as unknown as DatePersist)(
    (set) => ({
      date: initialDate,
      setDate: (date) => set({ date }),
    }),
    {
      name: key,
      partialize: (state) => ({ date: state.date }),
    }
  )
);

export default useDateStore;
