import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DatePersist } from "./type";
import dayjs from "dayjs";

const key = "date-store";

export const initialDate = dayjs().format("YYYY-MM-DD");

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
