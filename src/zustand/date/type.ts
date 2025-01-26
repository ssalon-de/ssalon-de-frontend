import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";

export interface DateStates {
  date: string; // format "YYYY-MM-DD"
}

export interface DateActions {
  setDate: (date: string) => void;
}

export type DatePersist = (
  config: StateCreator<DateStore>,
  options: PersistOptions<DateStates>
) => StateCreator<DateStore>;

export interface DateStore extends DateStates, DateActions {}
